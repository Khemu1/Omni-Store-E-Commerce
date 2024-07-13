import React from "react";
import { InfoField } from "../index";

const MyBasicInfo = () => {
  return (
    <section className="flex justify-center font-lato ">
      <div className="border bg-white border-gray-300 rounded-lg p-3 sm:w-[400px] sm:p-5 gap-6">
        <h2 className="text-xl mb-3 font-semibold">Basic Info</h2>
        <div className="flex flex-col gap-5">
          <InfoField title={"Email"} type={"email"} />
          <InfoField title={"Username"} type={"text"} />
          <InfoField title={"Password"} type={"password"} />
          <InfoField title={"Mobile Number"} type={"tel"} />
        </div>
      </div>
    </section>
  );
};

export default MyBasicInfo;
