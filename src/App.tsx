import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ProductDetails,
  NotFound,
  Home,
  Register,
  Login,
  PublicLayout,
  PrivateLayout,
  Cart,
  ProfileLayout,
  Checkout,
} from "./components/index";
import "./App.css";
import { useAccountInfo } from "./hooks/profile";

function App() {
  useAccountInfo();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/myprofile/*" element={<ProfileLayout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/user-cart" element={<Cart />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
