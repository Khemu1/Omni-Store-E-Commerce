import { Route, Routes } from "react-router-dom";
import {
  MyProfile,
  MyBasicInfo,
  WishListView,
  Orders,
  Addresses,
  EditEmail,
  EditMobile,
  EditPassword,
  EditUsername,
  NotFound,
  NewAddress,
  EditAddress,
  NewCard,
  Cards,
  EditCard,
} from "../index";
import { useValidateUser } from "../../hooks/authHooks";

const ProfileLayout = () => {
  useValidateUser();

  return (
    <Routes>
      <Route path="/" element={<MyProfile />} />
      <Route path="login-security" element={<MyBasicInfo />} />
      <Route path="display-wishlist" element={<WishListView />} />
      <Route path="display-orderlist" element={<Orders />} />
      <Route path="addresses" element={<Addresses />} />
      <Route path="addresses/new-address" element={<NewAddress />} />
      <Route path="addresses/edit-address" element={<EditAddress />} />
      <Route path="edit-email" element={<EditEmail />} />
      <Route path="edit-mobileNumber" element={<EditMobile />} />
      <Route path="edit-username" element={<EditUsername />} />
      <Route path="edit-password" element={<EditPassword />} />
      <Route path="payment" element={<Cards />} />
      <Route path="payment/add-card" element={<NewCard />} />
      <Route path="payment/edit-card" element={<EditCard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProfileLayout;
