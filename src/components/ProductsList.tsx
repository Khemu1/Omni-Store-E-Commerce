import { ProductCard } from "./index";
import { filters } from "../../constants/index";
import Filter from "./Filter";
import { useProducts } from "../../utils/index";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigateTo = useNavigate();
  useEffect(() => {
    const sort = searchParams.get("sort");
    const params = new URLSearchParams(searchParams);

    if (!sort) {
      params.set("sort", "az");
    }
    navigateTo(`?${params.toString()}`);
  }, [searchParams, setSearchParams]);
  const { allProducts, loading, error } =
    useProducts(searchParams.get("sort")?.toString()) || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="content">
      <div className="filters-wrapper">
        <Filter filters={filters} />
      </div>
      <div className="products-wrapper">
        {allProducts.length > 0 ? (
          allProducts.map((allProducts) => (
            <ProductCard product={allProducts} key={allProducts._id} />
          ))
        ) : (
          <div>Please Try Again Later</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
