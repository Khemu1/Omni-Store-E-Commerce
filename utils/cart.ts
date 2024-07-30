import { ProductProps } from "../types";
import axiosInstance from "./axiosInstance";

export const dsiplayCartItems = async (): Promise<ProductProps[] | []> => {
  try {
    const response = await axiosInstance.get("/account/user-cart");
    return response.data.cartItems;
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    throw error;
  }
};

export const addProductToCart = async (id: string, quantity = 1) => {
  try {
    const response = await axiosInstance.post("/products/add-to-cart", {
      productId: id,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    throw error;
  }
};

export const changeCartAmount = async (id: string, quantity: number) => {
  try {
    const response = await axiosInstance.post("/products/change-cart-amount", {
      productId: id,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    throw error;
  }
};
