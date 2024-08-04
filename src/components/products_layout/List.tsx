import { Link } from "react-router-dom";
import { ProductProps } from "../../../types/index";
import { useState, useRef, useEffect } from "react";
import { useAddToCart, useChangeCartAmount } from "../../hooks/cart";
import { useRemoveWishListItem } from "../../hooks/wishlist";
import { CartQunatity } from "../index";
import { ThreeDots } from "react-loader-spinner";

interface Pro {
  product: ProductProps;
  type: string;
  method?: () => Promise<void> | undefined;
  updatePrice?: () => void | undefined;
  handleCartClick?: () => Promise<void> | undefined;
  handleCartClickError?: string | null | undefined;
}

const List = ({
  product,
  type,
  method,
  updatePrice,
  handleCartClick,
  handleCartClickError,
}: Pro) => {
  const {
    error: addError,
    handleAddToCart,
    loading: addLoading,
    success: addSuccess,
  } = useAddToCart();

  const { handleRemove } = useRemoveWishListItem();
  const {
    handleChangeCartAmount,
    success,
    error: changeError,
    loading,
  } = useChangeCartAmount();
  const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
  const productMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuOpen = (id: string) => {
    setTimeout(() => {
      setIsMenuOpen((prev) => (prev === id ? null : id));
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productMenuRef.current &&
        !productMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemoveWishlistItem = async () => {
    await handleRemove(product._id);
    if (method) {
      await method();
    }
  };

  const handleRemoveCartItem = async () => {
    await handleRemove(product._id);
    if (method) {
      await method();
    }
  };

  const AddToCart = async () => {
    try {
      await handleAddToCart(product._id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt="product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 px-4">
        <Link
          to={`/product?id=${product._id}`}
          className="text-gray-900 font-medium"
        >
          {product.title}
        </Link>
      </div>
      <div className="w-24 text-center"></div>
      {product.totalPrice ? (
        <div className="w-24 text-center">${product.totalPrice}</div>
      ) : (
        <div className="w-24 text-center">${product.price}</div>
      )}
      {type === "cart" && (
        <CartQunatity
          quantity={{
            title: `Qty : ${product.quantity}`,
            value: product.quantity,
          }}
          handleQuantityChange={handleChangeCartAmount}
          id={product._id}
          success={success}
          error={changeError}
          refresh={method}
          updatePrice={updatePrice}
          loading={loading}
        />
      )}
      {type !== "cart" && (
        <div className="relative">
          <button
            type="button"
            onClick={() => handleMenuOpen(product._id)}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200"
            ref={menuButtonRef}
          >
            <img src="/assets/icons/menu.svg" alt="menu" className="w-5 h-5" />
          </button>
          {isMenuOpen === product._id && (
            <div
              ref={productMenuRef}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            >
              {type === "wish" && (
                <button
                  type="button"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleRemoveWishlistItem}
                >
                  Remove From Wishlist
                </button>
              )}
              {type === "cart" && (
                <button
                  type="button"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleRemoveCartItem}
                >
                  Remove From Cart
                </button>
              )}
              {type !== "cart" && (
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 m-auto"
                  onClick={AddToCart}
                >
                  {addLoading ? (
                    <ThreeDots
                      height="24"
                      width="24"
                      radius="9"
                      color="#000"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  ) : addSuccess ? (
                    <img
                      src="/assets/icons/checkmark-black.svg"
                      alt="Product Added"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              )}
            </div>
          )}
          {addError && (
            <div className="text-red-500 text-center">{addError}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
