import axiosInstance from "./axiosInstance";

export const getAllCheckoutData = async () => {
  try {
    const response = await axiosInstance.get("/checkout/get-checkout-data");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

