// App.tsx

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav, SearchBar, ProductsList, Footer } from "./components/index";
import { useProducts } from "../utils/index"; // Corrected the import path
import "./App.css";

function App() {
  const { allProducts, loading, error } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <main className="flex flex-col gap-10">
        <Nav />
        <Routes>
          <Route path="/">
            <section className="w-full flex flex-col p-3">
              <SearchBar />
              <ProductsList allProducts={allProducts} />
            </section>
          </Route>
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
