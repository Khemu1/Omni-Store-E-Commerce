import { SwiperS, ProductsList } from "../index";
import { useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../utils/index";
import { swiperImages } from "../../../constants";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
      searchParams.get("category"),
      searchParams.get("priceRange"),
    ],
    queryFn: () =>
      fetchAllProducts(
        searchParams.get("sort") ?? "az",
        searchParams.get("search") ?? "",
        searchParams.get("category") ?? "",
        searchParams.get("priceRange") ?? ""
      ),
  });

  return (
    <section className="flex flex-col w-full  my-5">
      <div className="flex w-[100dvw]  m-auto items-center justify-center relative  overflow-hidden">
        <SwiperS images={swiperImages} />
      </div>
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
