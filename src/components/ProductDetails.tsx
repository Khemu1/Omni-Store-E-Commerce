import { useSearchParams } from "react-router-dom";
import { useProduct } from "../../utils";
import { useState } from "react";

const ProductDetails = () => {
  const [productCount, setProdcutCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const { product, loading, error } = useProduct(id);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleIncrease = () => {
    if (productCount < 5) {
      setProdcutCount((prev) => prev + 1);
    }
  };
  const handleDecrease = () => {
    if (productCount > 1) {
      setProdcutCount((prev) => prev - 1);
    }
  };

  return (
    <section className="w-full flex">
      <div className="flex w-full gap-80 justify-center flex-wrap">
        <div className="product_details_img">
          <img src={product?.image} className="object-contain" alt="image" />
        </div>
        <div className="flex flex-col gap-5 items-start  p-3 rounded-lg  w-[450px]">
          <p className="text-gray-900 mb-3 capitalize font-semibold">
            {product?.category}
          </p>
          <p className="font-lato text-2xl font-semibold text-wrap ">
            {product?.title}
          </p>
          <p className="text-gray-800 font-lato mt-3 text-xl">
            {product?.description}
          </p>
          <div className="flex text-2xl font-lato">
            <span className="flex items-start text-base">$</span>
            <p className="font-extrabold"> {product?.price}</p>
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
              className="bg-black text-white font-lato py-2 px-4 rounded-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      \{" "}
    </section>
  );
};

export default ProductDetails;
