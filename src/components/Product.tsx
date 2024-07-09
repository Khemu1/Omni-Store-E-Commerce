import { useState } from "react";
import { ProductProps } from "../../types/index";

interface pro {
  product: ProductProps;
}

const Product = ({ product }: pro) => {
  const handleView = () => {
    console.log("view");
  };
  return (
    <div className="product">
      <div className="product_img_wrapper">
        <img src={product.image} alt="image" className="product_img" />
      </div>
      <div className="product-contents">
        <div className="product_content">
          <div className="product_content_title">{product.title}</div>
        </div>
        <div className="product_price  mt-2">
          <button type="button" className="relative w-[50px]">
            <img
              src="/public/assets/icons/add-to-cart.svg"
              className="object-contain  w-full h-h-full top-0 bottom-0 right-0 left-0"
            />
          </button>
          <div className="flex">
            <span className="flex text-sm items-start text-gray-900 ">$</span>
            {product.price}
          </div>
          <p>{product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
