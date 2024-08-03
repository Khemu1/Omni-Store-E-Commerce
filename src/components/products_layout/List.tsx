import { Link } from "react-router-dom";
import { ProductProps } from "../../../types/index";
import { useState } from "react";
import {
  useRemoveWishListItem,
  useChangeCartAmount,
} from "../../hooks/product";
import { CartQunatity } from "../index";

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
  const { handleRemove } = useRemoveWishListItem();
  const {
    handleChangeCartAmount,
    success,
    error: changeError,
    loading
  } = useChangeCartAmount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

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

  const handleAddToCart = async () => {
    try {
      if (handleCartClick) await handleCartClick();
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
            onClick={handleMenuOpen}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <img src="/assets/icons/menu.svg" alt="menu" className="w-5 h-5" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
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
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          )}
          {handleCartClickError && (
            <div className="text-red-500 text-center">
              {handleCartClickError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
