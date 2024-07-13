import React from "react";
import { Email, Password, Username } from "../index";

const MyBasicInfo = () => {
  return (
    <section className="font-lato border bg-white border-gray-300 rounded-lg p-3">
      <h2 className="text-xl">Basic Info</h2>
      <div className="flex-col  sm:w-[400px]">
        <Email />
        <Password />
        <Username />
      </div>
    </section>
  );
};

export default MyBasicInfo;
