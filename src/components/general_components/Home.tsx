import { SearchBar, ProductsList } from "../index";
import { useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../utils/index";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const navigateTo = useNavigate();

  useEffect(() => {
    const sort = searchParams.get("sort");
    const params = new URLSearchParams(searchParams);

    if (!sort) {
      params.set("sort", "az");
      navigateTo(`?${params.toString()}`);
    }
  }, [searchParams, navigateTo]);

  const {
    data: allProducts,
    isLoading,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "products",
      searchParams.get("sort"),
      searchParams.get("search"),
    ],
    queryFn: () =>
      fetchAllProducts(
        searchParams.get("sort") || "az",
        searchParams.get("search") || ""
      ),
  });

  return (
    <section className="grid grid-rows[1fr 2fr]  my-5">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error?.message ?? "Unknown error"}</div>
      ) : (
        <ProductsList allProducts={allProducts ?? []} />
      )}
    </section>
  );
};

export default Home;
