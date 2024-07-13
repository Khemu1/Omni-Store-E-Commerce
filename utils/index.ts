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

// const useProducts = (sortBy?: string, search?: string): UseProductsResponse => {
//   const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchAllProducts(sortBy, search);
//         setAllProducts(data);
//       } catch (error: any) {
//         setError(error.message || "Failed to fetch products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [searchParams]);

//   return { allProducts, loading, error };
// };

// const useProduct = (id: string): UseProductResponse => {
//   const [product, SetProduct] = useState<ProductProps | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigateTo = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchProduct(id);
//         SetProduct(data);
//       } catch (error: any) {
//         if (error.message === "Product not found") {
//           navigateTo("/404");
//         } else {
//           setError(error.message || "Failed to fetch product");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   return { product, loading, error };
// };

export { fetchProduct, fetchAllProducts };
