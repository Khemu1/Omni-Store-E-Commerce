import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../../utils/index";
import { SwiperS, ProductsList } from "../index";
import { swiperImages } from "../../../constants";


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
    isLoading: productsLoading,
    isError: productsError,
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
    <section className="flex flex-col w-full my-5">
      <div className="flex w-[100dvw] m-auto items-center justify-center relative overflow-hidden">
        <SwiperS images={swiperImages} />
      </div>
      {productsLoading ? (
        <div>Loading products...</div>
      ) : productsError ? (
        <div>Error loading products: {error?.message ?? "Unknown error"}</div>
      ) : (
        <ProductsList allProducts={allProducts ?? []} />
      )}
    </section>
  );
};

export default Home;
