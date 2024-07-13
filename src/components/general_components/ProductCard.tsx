import { useState } from "react";
import { ProductProps } from "../../../types/index";

import { Link } from "react-router-dom";

interface pro {
  product: ProductProps;
}

const ProductCard = ({ product }: pro) => {
  return (
    <Link to={`/product?id=${product._id}`} className="product">
      <div className="product_img_wrapper">
        <img src={product.image} alt="image" className="product_img" />
      </div>
      <div className="product-contents">
        <div className="product_content flex-col">
          <p className="text-left font-lato font-semibold text-sm text-gray-600 mb-4 capitalize">
            {product.category}
          </p>
          <p className="product_content_title">{product.title}</p>
        </div>
        <div className="product_price  mt-2">
          <button type="button" className="relative w-[50px]">
            <img
              src="/assets/icons/add-to-cart.svg"
              className="object-contain  w-full h-h-full top-0 bottom-0 right-0 left-0"
            />
          </button>
          <div className="flex">
            <span className="flex text-sm items-start text-gray-900 ">$</span>
            {product.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
