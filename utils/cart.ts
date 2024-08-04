import { ProductProps } from "../types";
import axiosInstance from "./axiosInstance";

export const dsiplayCartItems = async (): Promise<ProductProps[] | []> => {
  try {
    const response = await axiosInstance.get("/cart/user-cart");
    return response.data.cartItems;
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    throw error;
  }
};

export const addProductToCart = async (id: string, quantity = 1) => {
  try {
    const response = await axiosInstance.post("/cart/add-to-cart", {
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
    const response = await axiosInstance.post("/cart/change-cart-amount", {
      productId: id,
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const response = await axiosInstance.delete("/cart/clear-cart");
    return response.data;
  } catch (error) {
    console.error("Failed to clear cart:", error);
    throw error;
  }
};

export const calcTotalPrice = (
  products: ProductProps[],
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
) => {
  let total = 0;
  products.forEach((product) => {
    total += product.price * product.quantity;
  });
  setTotalPrice(parseFloat(total.toFixed(2)));
};
