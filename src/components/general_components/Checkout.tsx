import React from "react";
import { useValidateUser } from "../../hooks/authHooks";

const Checkout = () => {
  useValidateUser();
  return (
    <section className="flex justify-center my-9">
      <div></div>
    </section>
  );
};

export default Checkout;
