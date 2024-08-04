import { ProductCard, Sidebar } from "../index";
import { useSearchParams } from "react-router-dom";
import { ProductListProps } from "../../../types/index";
import { useState, useEffect } from "react";

const ProductsList = ({ allProducts }: ProductListProps) => {
  const [layout, setLayout] = useState("grid");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const layoutParam = searchParams.get("layout");
    if (layoutParam && layoutParam.toLowerCase() === "list") {
      setLayout("list");
    } else {
      setLayout("grid");
    }
  }, [searchParams]);

  return (
    <section className="flex mt-10">
      <Sidebar />
      <div className="content">
        <div
          className={
            layout === "list" ? "products_wrapper_list" : "products_wrapper"
          }
        >
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
              <ProductCard
                product={product}
                layout={layout}
                key={product._id}
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
