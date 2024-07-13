import { SearchBar, ProductsList } from "../index";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../../utils/index";
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

  const { allProducts, loading, error } = useProducts(
    searchParams.get("sort")?.toString() || "az",
    searchParams.get("search")?.toString() || ""
  );

  return (
    <section className="grid grid-rows[1fr 2fr] p-3">
      <SearchBar />
      <ProductsList allProducts={allProducts} loading={loading} error={error} />
    </section>
  );
};

export default Home;
