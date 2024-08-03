import axiosInstance from "./axiosInstance";

export const getOrders = async () => {
  try {
    const response = axiosInstance.get("/account/get-orders");
    return (await response).data;
  } catch (error) {
    console.error("Failed to get orders:", error);
    throw error;
  }
};
