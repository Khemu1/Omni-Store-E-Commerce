import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import List from "../products_layout/List";
import { ProductProps } from "../../../types";
import { useDisplayCartList, useClearCart } from "../../hooks/cart";
import { Link } from "react-router-dom";
import { calcTotalPrice } from "../../../utils/cart";

const Cart = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { loading, error, data, handleDisplayCartList } = useDisplayCartList();
  const {
    loading: clearLoading,
    error: clearError,
    success: clearSuccess,
    handleClearCart,
  } = useClearCart();

  useEffect(() => {
    handleDisplayCartList();
  }, []);

  useEffect(() => {
    if (data) {
      setProducts(data);
      calcTotalPrice(data, setTotalPrice);
    }
  }, [data]);

  useEffect(() => {
    if (clearSuccess) {
      setTimeout(() => {
        handleDisplayCartList();
      }, 500);
    }
  }, [clearSuccess]);

  const clearCart = async () => {
    try {
      await handleClearCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="my-10 flex-col font-lato p-4">
      <h2 className="font-extrabold text-2xl mb-8">My Cart</h2>
      {loading ? (
        <div className="flex justify-center">
          <ThreeDots
            height="100"
            width="100"
            radius="9"
            color="#000000"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : error ? (
        <div>Please Try Again Later</div>
      ) : products.length === 0 ? (
        <div className="font-semibold text-xl capitalize">
          Start adding products to your cart
        </div>
      ) : (
        <>
          {products.map((product) => (
            <List
              method={handleDisplayCartList}
              type={"cart"}
              product={product}
              key={product._id}
              updatePrice={() => calcTotalPrice(products, setTotalPrice)}
            />
          ))}
          <div className="flex w-full justify-between mt-4 font-lato">
            <div className="flex gap-3">
              <button type="button">
                <Link
                  to="/checkout"
                  className="text-sm bg-blue-600 text-white p-2 rounded-xl"
                >
                  {" "}
                  Proceed To Buy
                </Link>
              </button>
              <button
                className="text-sm bg-blue-600 text-white p-2 rounded-xl              w-[79.5px] h-[36px] flex justify-center items-center"
                type="button"
                onClick={clearCart}
              >
                {clearLoading ? (
                  <ThreeDots
                    height="30"
                    width="30"
                    radius="9"
                    color="#ffffff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                ) : clearSuccess ? (
                  <img
                    src="/assets/icons/checkmark.svg"
                    alt="Product Added"
                    className="w-[30px] h-[30px] object-contain"
                  />
                ) : (
                  "Clear Cart"
                )}
              </button>
              <br />
              {clearError && (
                <p className="text-sm text-red-600">{clearError}</p>
              )}
            </div>
            <p>Total Price : ${totalPrice}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
