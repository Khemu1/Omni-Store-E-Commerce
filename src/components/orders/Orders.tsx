import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { OrderProps, ProductProps } from "../../../types";
import { useGetOrders } from "../../hooks/order";
import { Order } from "../index";
const Orders = () => {
  const [orders, setOrders] = useState<OrderProps[] | null>(null);
  const { loading, error, data, handleGetOrders } = useGetOrders();

  useEffect(() => {
    handleGetOrders();
  }, []);

  useEffect(() => {
    setOrders(data);
  }, [data]);

  return (
    <section className="my-10 flex-col font-lato p-4">
      <h2 className="font-extrabold text-2xl mb-5">My orders</h2>
      <div>
        {loading ? (
          <div className="flex justify-center my-5">
            <ThreeDots
              height="100"
              width="100"
              radius="9"
              color="#000000"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : error ? (
          <div className="flex justify-center text-red-600 text-2xl font-semibold">
            Please Try Again Later
          </div>
        ) : orders && orders.length === 0 ? (
          <div className="font-semibold text-xl capitalize">
            No Orders avilable, make a purchase
          </div>
        ) : (
          orders &&
          orders.map((o: OrderProps) => <Order order={o} key={o._id} />)
        )}
      </div>
    </section>
  );
};

export default Orders;
