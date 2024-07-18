import { Link } from "react-router-dom";
import { ProductProps } from "../../../types/index";
import { useState } from "react";

interface Pro {
  product: ProductProps;
}

const List = ({ product }: Pro) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-10 flex items-center justify-center">
        <input type="checkbox" className="form-checkbox h-4 w-4" />
      </div>
      <div className="w-10 h-10 flex items-center justify-center">
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
      <div className="w-24 text-center">${product.price}</div>

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
            <Link
              to="myprofile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Buy Now
            </Link>
            <button
              type="button"
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
