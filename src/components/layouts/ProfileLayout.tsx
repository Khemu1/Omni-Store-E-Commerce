import { Route, Routes } from "react-router-dom";
import {
  MyProfile,
  MyBasicInfo,
  WishListView,
  OrderListView,
  Addresses,
  EditEmail,
  EditMobile,
  EditPassword,
  EditUsername,
  NotFound,
  NewAddress,
  EditAddress,
} from "../index";
import { useValidateUser } from "../../hooks/authHooks";
import Cards from "../my_profile_components/Cards";

const ProfileLayout = () => {
  useValidateUser();

  return (
    <Routes>
      <Route path="/" element={<MyProfile />} />
      <Route path="login-security" element={<MyBasicInfo />} />
      <Route path="display-wishlist" element={<WishListView />} />
      <Route path="display-orderlist" element={<OrderListView />} />
      <Route path="addresses" element={<Addresses />} />
      <Route path="addresses/new-address" element={<NewAddress />} />
      <Route path="addresses/edit-address" element={<EditAddress />} />
      <Route path="edit-email" element={<EditEmail />} />
      <Route path="edit-mobileNumber" element={<EditMobile />} />
      <Route path="edit-username" element={<EditUsername />} />
      <Route path="edit-password" element={<EditPassword />} />
      <Route path="payment" element={<Cards />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProfileLayout;
