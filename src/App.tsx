import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {

  ProductDetails,
  NotFound,
  Home,
  MyProfile,
  MyBasicInfo,
  Addresses,
  Register,
  Login,
  EditEmail,
  EditMobile,
  EditUsername,
  EditPassword,
  PublicLayout,
  PrivateLayout,
} from "./components/index";
import { useValidateUser } from "./hooks/authHooks";
import "./App.css";

function App() {
  useValidateUser();
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
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myprofile/login-security" element={<MyBasicInfo />} />
          <Route path="/myprofile/addresses" element={<Addresses />} />
          <Route path="/myprofile/edit-email" element={<EditEmail />} />
          <Route path="/myprofile/edit-mobileNumber" element={<EditMobile />} />
          <Route path="/myprofile/edit-username" element={<EditUsername />} />
          <Route path="/myprofile/edit-password" element={<EditPassword />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
