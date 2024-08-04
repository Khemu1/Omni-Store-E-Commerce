import { Link } from "react-router-dom";
import { ProductProps } from "../../../types/index";
import { useAddToCart } from "../../hooks/cart";
import { ThreeDots } from "react-loader-spinner";
interface pro {
  product: ProductProps;
}
const Grid = ({ product }: pro) => {
  const { error, handleAddToCart, loading, success } = useAddToCart();

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
          onClick={() => handleAddToCart(product._id)}
          type="button"
          className="w-full flex justify-center  text-white bg-blue-600  rounded-lg p-2 mt-3"
        >
          {loading ? (
            <ThreeDots
              height="24"
              width="24"
              radius="9"
              color="#ffffff"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          ) : success ? (
            <img
              src="/assets/icons/checkmark.svg"
              alt="roduct Added"
              className="w-[24px] h-[24px] object-contain"
            />
          ) : (
            "Add To Cart"
          )}
        </button>
        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Grid;
