import { UseProductsResponse, ProductProps } from "../types/index";
import { useState, useEffect } from "react";

async function fetchAllProducts(): Promise<ProductProps[]> {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

const useProducts = (): UseProductsResponse => {
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setAllProducts(data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { allProducts, loading, error };
};

export { useProducts };
