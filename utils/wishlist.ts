import { ProductProps } from "../types";
import axiosInstance from "./axiosInstance";

export async function displayWishList(): Promise<ProductProps[] | []> {
  try {
    const response = await axiosInstance.get("/wishlist/user-wishlist");
    console.log(response.data.wishlist);

    return response.data.wishlist;
  } catch (error) {
    console.error("Failed to fetch wish list:", error);
    throw error;
  }
}

export const toggleWishListProduct = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/wishlist/toggle-wishlist?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to toggle wish list:", error);
    throw error;
  }
};

export const removeWishListItem = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/wishlist/remove-from-wishlist?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to remove wish list item:", error);
    throw error;
  }
};

export const clearWishList = () => {
  try {
    const response = axiosInstance.delete("/wishlist/clear-wishlist");
    return response;
  } catch (error) {
    console.error("Failed to clear wish list:", error);
    throw error;
  }
};
