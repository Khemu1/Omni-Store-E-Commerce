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
} from "./components/index";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main>
          <Routes></Routes>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route
              path="/myprofile/login-security"
              element={<MyBasicInfo />}
            ></Route>
            <Route path="/myprofile/addresses" element={<Addresses />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
