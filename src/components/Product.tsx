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
        <button
          type="button"
          className="absolute w-[10%]
          bottom-0 right-[1%] z-10"
          onClick={handleView}
        >
          <img src="/assets/icons/view.svg" alt="view product" />
        </button>
      </div>
      <div className="product-contents">
        <div className="product_content">
          <div className="product_content_title">{product.title}</div>
        </div>
        <p className="product_price ">
          <span className="flex text-sm items-start text-gray-900 ">$</span>
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default Product;
