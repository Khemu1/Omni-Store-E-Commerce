// ProductList.tsx

import Product from "./Product";
import { filters } from "../../constants/index";
import Filter from "./Filter";
import { ProductsListProps } from "../../types/index";


const ProductsList = ({ allProducts }: ProductsListProps) => {
  return (
    <div className="content">
      <div className="filters-wrapper">
        <Filter filters={filters} />
      </div>
      <div className="products-wrapper">
        {allProducts.length > 0 ? (
          allProducts.map((allProducts) => (
            <Product product={allProducts} key={allProducts.id} />
          ))
        ) : (
          <div>Please Try Again Later</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
