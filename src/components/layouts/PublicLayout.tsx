import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";

const PublicLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axiosInstance.post("/account/logout");
        dispatch(logout());
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    logoutUser();
  }, [dispatch]);

  return (
    <main className="flex w-full h-[100dvh] justify-center items-center">
      <Outlet />
    </main>
  );
};

export default PublicLayout;
