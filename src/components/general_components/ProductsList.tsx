import { ProductCard, PriceFilter } from "../index";
import { filters, categories, layouts } from "../../../constants/index";
import Filter from "./Filter";
import { ProductListProps } from "../../../types/index";

const ProductsList = ({ allProducts }: ProductListProps) => {
  return (
    <section className="flex mt-10">
      <div className="filters_wrapper">
        <div className="flex flex-col gap-3">
          <h2 className="font-lato text-3xl font-semibold mb-2">Layout</h2>
          <Filter param="layout" filters={layouts} />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-lato text-3xl font-semibold mb-2 ">Filters</h2>
          <Filter param="sort" filters={filters} />
          <Filter param="category" filters={categories} />
          <PriceFilter />
        </div>
      </div>
      <div className="content">
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
    </section>
  );
};

export default ProductsList;
