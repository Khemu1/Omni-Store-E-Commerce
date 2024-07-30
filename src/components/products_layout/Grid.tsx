import { Link } from "react-router-dom";
import { ProductProps } from "../../../types/index";
interface pro {
  product: ProductProps;
  handleCartClick: () => Promise<void> | undefined;
  handleCartClickError: string | null | undefined;
}
const Grid = ({ product, handleCartClick, handleCartClickError }: pro) => {
  return (
    <div className="product">
      <Link to={`/product?id=${product._id}`} className="product_img_wrapper">
        <img src={product.image} alt="image" className="product_img" />
      </Link>
      <div className="product-contents">
        <div className="product_content flex-col">
          <p className="text-left font-lato font-semibold text-sm text-gray-600 mb-4 capitalize">
            {product.category}
          </p>
          <p className="product_content_title">{product.title}</p>
        </div>
        <div className="product_price">
          <div className="flex">
            <span className="flex text-sm items-start text-gray-900 ">$</span>
            {product.price}
          </div>
        </div>
        <button
          onClick={handleCartClick}
          type="button"
          className="w-full  text-white bg-blue-600  rounded-lg p-2 mt-3"
        >
          Add To Cart
        </button>
        {handleCartClickError && (
          <p className="text-sm text-red-600 mt-4">{handleCartClickError}</p>
        )}
      </div>
    </div>
  );
};

export default Grid;
