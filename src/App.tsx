// App.tsx

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Nav,
  SearchBar,
  ProductsList,
  Footer,
  ProductDetails,
  NotFound,
  Home,
} from "./components/index";
import "./App.css";

function App() {
  return (
    <Router>
      <main>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
