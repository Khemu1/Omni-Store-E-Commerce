import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDsiplayCartList } from "../../hooks/profile";
import { ProductProps } from "../../../types";
import List from "../products_layout/List";

const OrderList = () => {
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const { loading, error, data, handleDisplayCartList } = useDsiplayCartList();

  useEffect(() => {
    handleDisplayCartList();
  }, []);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <section className="my-10 flex-col font-lato p-4">
      <h2 className="font-semibold text-xl mb-5">My orders</h2>
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
        <div>Start making making orders</div>
      ) : (
        products.map((product) => (
          <List
            method={handleDisplayCartList}
            type={"wish"}
            product={product}
            key={product._id}
          />
        ))
      )}
    </section>
  );
};

export default OrderList;
