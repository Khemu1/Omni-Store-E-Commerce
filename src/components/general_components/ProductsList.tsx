import { ProductCard, PriceFilter } from "../index";
import { filters, categories, layouts } from "../../../constants/index";
import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import { ProductListProps } from "../../../types/index";
import { useState, useEffect } from "react";

const ProductsList = ({ allProducts }: ProductListProps) => {
  const [layout, setLayout] = useState("grid");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const layout = searchParams.get("layout");
    if (layout && layout.toLowerCase() === "list") {
      setLayout("list");
    } else {
      setLayout("grid");
    }
  }, [searchParams]);
  return (
    <section className="flex mt-10">
      <div className="hidden sm:flex flex-col bg-white gap-10 relative border-2 rounded-xl py-5 px-5 flex-grow-[0] flex-shrink-[1] h-max">
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
        <div
          className={
            layout === "list" ? "products_wrapper_list" : "products_wrapper"
          }
        >
          {allProducts.length > 0 ? (
            allProducts.map((allProducts) => (
              <ProductCard
                product={allProducts}
                layout={layout}
                key={allProducts._id}
              />
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
