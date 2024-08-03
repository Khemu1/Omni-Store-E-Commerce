import React from "react";
import { OrderProps } from "../../../types";
import { ProductOrder } from "../index";
import { formatISODate } from "../../../utils/order";

const Order: React.FC<{ order: OrderProps }> = ({ order }) => {
  return (
    <div className="flex  flex-col gap-2">
      <div className="flex flex-col gap-2 border-b-2 py-2">
        <div className="font-extrabold">
          Create At : {formatISODate(order.orderDate)}
        </div>
        <div className="font-semibold">Order Id : {order._id}</div>
        <h2 className="font-semibold text-xl">Buyer Info</h2>
        <div className="font-semibold"> Total Price : $ {order.totalPrice}</div>
        <div className="font-semibold">
          Card :{" "}
          <span className="text-gray-500">
            {order.card.last4Numbers} | {order.card.type.toUpperCase()} |{" "}
            {order.card.name.toUpperCase()}
          </span>
        </div>
        <div className="font-semibold">
          Address :{" "}
          <span className="text-gray-500">
            {" "}
            {order.address.name}| {order.address.street} | {order.address.city}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-xl">Products</h2>
        <div className="flex flex-col gap-2">
          {order.products.map((product) => (
            <ProductOrder product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
