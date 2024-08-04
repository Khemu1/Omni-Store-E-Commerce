import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "../../../utils/product";
import { SwiperS, ProductsList } from "../index";
import { swiperImages } from "../../../constants";
import { ThreeDots } from "react-loader-spinner";

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
      <div className="flex w-[100dvw] h-[800px] m-auto items-center justify-center relative overflow-hidden">
        <SwiperS images={swiperImages} />
      </div>
      {productsLoading ? (
        <div className="flex m-auto my-5">
          <ThreeDots
            height="100"
            width="100"
            radius="10"
            color="#000"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : productsError ? (
        <div className="m-auto text-2xl text-red-600 font-semibold font-lato my-5">
          Error Loading Products, Please Try Again Later
        </div>
      ) : (
        <ProductsList allProducts={allProducts ?? []} />
      )}
    </section>
  );
};

export default Home;
