import React from "react";
import { Outlet } from "react-router-dom";
import { Nav, Footer } from "../index";

const PrivateLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateLayout;
