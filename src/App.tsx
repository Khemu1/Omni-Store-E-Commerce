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
          <Route path="/myprofile" element={<MyProfile />} />
          <Route
            path="/myprofile/login-security"
            element={<MyBasicInfo />}
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
