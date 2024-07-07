import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";

import "./App.css";

function App() {
  return (
    <Router>
      <Nav />
    </Router>
  );
}

export default App;
