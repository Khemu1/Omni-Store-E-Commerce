import axiosInstance from "./axiosInstance";

export const getCheckoutData = async () => {
  try {
    const response = await axiosInstance.get("/account/get-checkout-data");
    return response.data;
  } catch (error) {
    console.error("Failed to get checkout data:", error);
    throw error;
  }
};
