import { Link } from "react-router-dom";
import { ProductProps } from "../../../types/index";
import { useChangeCartAmount } from "../../hooks/product";
import { CartQunatity } from "../index";

interface Pro {
  product: ProductProps;
  refresh: () => Promise<void> | undefined;
  updatePrice: () => void | undefined;
}

const CheckoutProducts = ({ product, refresh, updatePrice }: Pro) => {
  const {
    handleChangeCartAmount,
    success,
    error: changeError,
    loading,
  } = useChangeCartAmount();

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
      {product.totalPrice ? (
        <div className="text-center sm:text-xl">${product.totalPrice}</div>
      ) : (
        <div className="text-center">${product.price}</div>
      )}
      <CartQunatity
        quantity={{
          title: `Qty : ${product.quantity}`,
          value: product.quantity,
        }}
        handleQuantityChange={handleChangeCartAmount}
        id={product._id}
        success={success}
        error={changeError}
        refresh={refresh}
        updatePrice={updatePrice}
        loading={loading}
      />
    </div>
  );
};

export default CheckoutProducts;
