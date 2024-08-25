import { useEffect, useState } from "react";
import { ProductProps } from "../../../types";
import { useDsiplayWithList, useClearWishList } from "../../hooks/wishlist";
import { ThreeDots } from "react-loader-spinner";
import List from "../products_layout/List";

const WishListView = () => {
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const { loading, error, data, handleDisplayWithList } = useDsiplayWithList();
  const {
    loading: clearLoading,
    error: clearError,
    success: clearSuccess,
    handleClearWishList,
  } = useClearWishList();

  const clearWishList = async () => {
    try {
      await handleClearWishList();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleDisplayWithList();
  }, []);

  useEffect(() => {
    if (clearSuccess) {
      setTimeout(() => {
        handleDisplayWithList();
      }, 500);
    }
  }, [clearSuccess]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <section className="my-10 flex-col font-lato p-4">
      <h2 className="font-semibold text-xl mb-5">My Wishlist</h2>
      {loading ? (
        <div className="flex justify-center my-5">
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
        <div className="flex justify-center text-red-600 font-semibold text-2xl">
          Please Try Again Later
        </div>
      ) : products.length === 0 ? (
        <div className="text-xl font-semibold">
          Start adding products to your wishlist
        </div>
      ) : (
        products.map((product) => (
          <List
            method={handleDisplayWithList}
            type={"wish"}
            product={product}
            key={product._id}
          />
        ))
      )}
      <button
        className="text-sm bg-blue-600 text-white p-2 rounded-xl w-[120px] h-[36px] flex justify-center items-center mt-3 font-semibold"
        type="button"
        onClick={clearWishList}
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
          "Clear Wishlist"
        )}
      </button>
      <br />
      {clearError && <p className="text-sm text-red-600">{clearError}</p>}
    </section>
  );
};

export default WishListView;
