import { ProductCard } from "./index";
import { filters } from "../../constants/index";
import Filter from "./Filter";
import { ProductListProps } from "../../types/index";

const ProductsList = ({ allProducts, loading, error }: ProductListProps) => {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="content">
      <div className="filters-wrapper">
        <Filter filters={filters} />
      </div>
      {loading ? (
        <div className="font-lato font-semibold text-xl">Loading......</div>
      ) : (
        <div className="products-wrapper">
          {allProducts.length > 0 ? (
            allProducts.map((allProducts) => (
              <ProductCard product={allProducts} key={allProducts._id} />
            ))
          ) : (
            <div className="font-lato font-semibold text-xl">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
