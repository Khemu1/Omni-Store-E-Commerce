import { CreateOrderProps } from "../types";
import axiosInstance from "./axiosInstance";

export const getAllCheckoutData = async () => {
  try {
    const response = await axiosInstance.get("/account/get-checkout-data");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const createOrder = async (data: CreateOrderProps) => {
  try {
    const response = await axiosInstance.post("/account/add-order", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw error;
  }
};
