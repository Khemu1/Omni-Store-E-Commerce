import { ProductProps } from "../types/index";

export const fetchAllProducts = async (): Promise<ProductProps[]> => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    });
    const result: ProductProps[] = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
