import { ProductCard } from "../index";
import { filters } from "../../../constants/index";
import Filter from "./Filter";
import { ProductListProps } from "../../../types/index";

const ProductsList = ({ allProducts }: ProductListProps) => {
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
          <div className="font-lato font-semibold text-xl">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
