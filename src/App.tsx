import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Nav, SearchBar, Product, Filter, Footer } from "./components/index";
import { fetchAllProducts } from "../utils/index"; // Corrected the import path
import { ProductProps } from "../types/index";
import { filters } from "../constants/index";
import "./App.css";

function App() {
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllProducts();
      setAllProducts(data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <main className="flex flex-col gap-10">
        <Nav />
        <section className="w-full flex flex-col p-3">
          <SearchBar />
          {allProducts.length > 0 ? (
            <div className="content">
              <div className="filters-wrapper">
                <Filter filters={filters} />
              </div>
              <div className="products-wrapper">
                {allProducts.map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </div>
            </div>
          ) : (
            <div>Please Try Again Later</div>
          )}
        </section>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
