import { CardFormProps } from "../types";
import axiosInstance from "./axiosInstance";

export const getCheckoutData = async () => {
  try {
    const response = await axiosInstance.get(
      "/paytment-method/get-checkout-data"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get checkout data:", error);
    throw error;
  }
};

export const addCard = async (card: CardFormProps) => {
  try {
    const response = await axiosInstance.post(
      "/paytment-method/add-card",
      card
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add card:", error);
    throw error;
  }
};

export const getCards = async (signal?: AbortSignal) => {
  try {
    const response = await axiosInstance.get("/paytment-method/get-cards", {
      signal,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get cards:", error);
    throw error;
  }
};

export const setCardDefault = async (id: string) => {
  try {
    const response = await axiosInstance.patch(
      "/paytment-method/set-card-default",
      {
        id,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get cards:", error);
    throw error;
  }
};
export const getCard = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/paytment-method/get-card?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get card:", error);
    throw error;
  }
};
export const updateCard = async (id: string, card: CardFormProps) => {
  try {
    const response = await axiosInstance.patch(
      `/paytment-method/update-card?id=${id}`,
      card
    );
    return response.data;
  } catch (error) {
    console.error("Failed to edit card:", error);
    throw error;
  }
};

export const deleteCard = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/paytment-method/delete-card?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to edit card:", error);
    throw error;
  }
};
