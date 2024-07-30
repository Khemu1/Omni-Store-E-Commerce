import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import List from "../products_layout/List";
import { ProductProps } from "../../../types";
import { useDsiplayCartList } from "../../hooks/profile";

const Cart = () => {
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { loading, error, data, handleDisplayCartList } = useDsiplayCartList();

  const calcTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product?.quantity;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    handleDisplayCartList();
    calcTotalPrice();
  }, []);

  useEffect(() => {
    setProducts(data);
    calcTotalPrice();
  }, [data]);

  return (
    <section className="my-10 flex-col font-lato p-4">
      <h2 className="font-semibold text-xl mb-5">My Cart</h2>
      {loading ? (
        <ThreeDots
          height="30"
          width="30"
          radius="9"
          color="#000000"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : error ? (
        <div>Please Try Again Later</div>
      ) : products.length === 0 ? (
        <div>Start adding products to your cart</div>
      ) : (
        products.map((product) => (
          <List
            method={handleDisplayCartList}
            type={"cart"}
            product={product}
            key={product._id}
            updatePrice={calcTotalPrice}
          />
        ))
      )}
      <div className="flex w-full justify-between mt-4 font-lato">
        <button
          type="button"
          className="text-sm bg-black text-white p-2 rounded-xl"
        >
          Proceed To Buy
        </button>
        <p>Total Price : ${totalPrice}</p>
      </div>
    </section>
  );
};

export default Cart;
