import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav, SearchBar, Product, Filter } from "./components/index";
import { fetchAllProducts } from "../utils/index";
import { ProductProps } from "../types/index";
import { filters } from "../constants/index";
import "./App.css";

function App() {
  const [allProdcuts, setAllProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllProducts();
      setAllProducts(data);
    };
    fetchData();
  }, []);
  console.log(allProdcuts);

  return (
    <Router>
      <main className="flex flex-col">
        <Nav />
        <section className="w-full flex flex-col bg-light-gray mt-10 p-3">
          <SearchBar />
          <div className="content">
            <div className="filters-wrapper">
              <Filter
                allProdcuts={allProdcuts}
                setAllProducts={setAllProducts}
                filters={filters}
              />
            </div>
            <div className="products-wrapper">
              {allProdcuts.length > 0 ? (
                allProdcuts.map((product) => (
                  <Product product={product} key={product.id} />
                ))
              ) : (
                <div>Try again Later</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </Router>
  );
}

export default App;
