import { CreateOrderProps } from "../types";
import axiosInstance from "./axiosInstance";

export const getOrders = async () => {
  try {
    const response = axiosInstance.get("/order/get-orders");
    return (await response).data;
  } catch (error) {
    console.error("Failed to get orders:", error);
    throw error;
  }
};

export function formatISODate(isoDateString: Date) {
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export const createOrder = async (data: CreateOrderProps) => {
  try {
    const response = await axiosInstance.post("/order/add-order", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};
