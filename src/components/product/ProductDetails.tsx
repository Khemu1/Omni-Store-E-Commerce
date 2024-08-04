import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../../../utils/product";
import { useEffect, useState } from "react";
import { ImageDialog } from "../index";
import { useQuery } from "@tanstack/react-query";
import { ProductProps } from "../../../types";
import { ThreeDots } from "react-loader-spinner";
import { useToggleWishList } from "../../hooks/wishlist";
import { useAddToCart } from "../../hooks/cart";

const ProductDetails = () => {
  const { handleToggle } = useToggleWishList();
  const navigateTo = useNavigate();
  const [wish, setWish] = useState<boolean>(false);
  const [productCount, setProductCount] = useState(1);
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const id = searchParams.get("id") ?? "";

  const {
    isLoading: isPending,
    isError,
    data: product,
  } = useQuery<ProductProps>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const { error, handleAddToCart, loading, success } = useAddToCart();

  const handleWishToggle = async () => {
    try {
      if (product?._id) {
        await handleToggle(product._id);
        setWish((prev) => !prev);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
    }
  };

  useEffect(() => {
    if (product) {
      setWish(product.have);
    }
  }, [product]);

  if (isPending) {
    return (
      <div className="flex justify-center my-5">
        <ThreeDots
          height="100"
          width="100"
          radius="10"
          color="#000000"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    navigateTo("/404");
    return null;
  }

  const handleIncrease = () => {
    if (productCount < 5) {
      setProductCount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (productCount > 1) {
      setProductCount((prev) => prev - 1);
    }
  };

  const handleAdd = async () => {
    try {
      if (product && product._id) {
        await handleAddToCart(product._id, productCount);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return (
    <section className="w-full flex my-10">
      <ImageDialog
        imagePath={product?.image ?? ""}
        closeDialog={() => setIsOpen(false)}
        isOpen={isOpen}
      />
      <div className="flex w-full gap-20 justify-center flex-wrap">
        <button className="product_details_img" onClick={() => setIsOpen(true)}>
          <img src={product?.image} className="object-contain" alt="image" />
        </button>
        <div className="flex flex-col gap-5 items-start p-3 rounded-lg w-[350px] sm:w-[450px]">
          <p className="text-gray-900 mb-3 capitalize font-semibold">
            {product?.category}
          </p>
          <p className="font-lato text-2xl font-semibold text-wrap">
            {product?.title}
          </p>
          <p className="text-gray-800 font-lato mt-3 text-xl">
            {product?.description}
          </p>
          <div className="flex w-full justify-between text-2xl font-lato">
            <div>
              <p className="font-extrabold">${product?.price}</p>
            </div>
            <div className="flex items-end">
              <button type="button" onClick={handleWishToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e62800"
                >
                  <path
                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                    fill={wish ? "red" : "none"}
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex gap-3">
              <button
                type="button"
                className="w-[15px]"
                onClick={handleDecrease}
              >
                <img
                  src="/assets/icons/minus.svg"
                  alt="-"
                  className="object-contain w-full"
                />
              </button>
              <input value={productCount} readOnly className="product_count" />
              <button
                type="button"
                className="w-[15px]"
                onClick={handleIncrease}
              >
                <img
                  src="/assets/icons/plus.svg"
                  alt="+"
                  className="object-contain w-full"
                />
              </button>
            </div>
            <button
              type="button"
              className="font-semibold bg-blue-600 text-white font-lato py-1 rounded-lg sm:py-2 px-4 w-[116.6px] h-[40px] flex justify-center items-center"
              onClick={handleAdd}
            >
              {loading ? (
                <ThreeDots
                  height="50"
                  width="50"
                  radius="9"
                  color="#ffffff"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              ) : success ? (
                <img
                  src="/assets/icons/checkmark.svg"
                  alt="Product Added"
                  className="w-[24px] h-[24px] object-contain"
                />
              ) : (
                "Add To Cart"
              )}
            </button>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
