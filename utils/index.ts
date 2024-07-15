import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  UseProductsResponse,
  ProductProps,
  UseProductResponse,
} from "../types/index";

 async function fetchAllProducts(
  sortBy?: string,
  search?: string
): Promise<ProductProps[]> {
  const response = await fetch(
    `/api/products?sortBy=${sortBy}&search=${search}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

 async function fetchProduct(id: string): Promise<ProductProps> {
  const response = await fetch(`/api/products/product?id=${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
export { fetchProduct, fetchAllProducts };
