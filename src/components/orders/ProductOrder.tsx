import React from "react";
import { Link } from "react-router-dom";
import { ProductProps } from "../../../types";

const ProductOrder: React.FC<{ product: ProductProps }> = ({ product }) => {
  console.log(product);
  return (
    <div className="flex flex-col gap-3 justify-center items-center py-4 border-b border-gray-200 ">
      <div className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt="product"
          className="w-full h-full object-fit"
        />
      </div>
      <div className="flex">
        <Link
          to={`/product?id=${product._id}`}
          className="text-center overflow-hidden text-ellipsis  max-h-[80px] justify-center text-blue-500"
        >
          {product.title}
        </Link>
      </div>
      <div className="flex flex-col text-center sm:text-xl gap-2">
        <p>Price Per Item : ${product.price}</p>
        <p> Quantity : {product.quantity}</p>
      </div>
    </div>
  );
};

export default ProductOrder;
