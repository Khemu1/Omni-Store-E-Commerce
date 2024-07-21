// App.tsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Nav,
  Footer,
  ProductDetails,
  NotFound,
  Home,
  MyProfile,
  MyBasicInfo,
  Addresses,
  Register,
  Login,
} from "./components/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main>
          <Nav />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/myprofile/login-security" element={<MyBasicInfo />} />
            <Route path="/myprofile/addresses" element={<Addresses />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
