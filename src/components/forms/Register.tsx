import { useForm, SubmitHandler, Controller } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterProps } from "../../../types";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { getValidateRegisterSchema } from "../../../utils/formValidations";

const Register = () => {
  const [countryCode, setCountryCode] = useState("eg");
  const validationSchema = getValidateRegisterSchema(countryCode);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<RegisterProps> = (data) => {
    console.log(data);
  };

  return (
    <section className="flex justify-center bg-white rounded-xl m-auto p-4 w-[500px]">
      <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            className="bg-gray-100 rounded-lg py-1 px-2"
            type="text"
            name="email"
            id="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            className="bg-gray-100 rounded-lg py-1 px-2"
            type="text"
            name="username"
            id="username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            className="bg-gray-100 rounded-lg py-1 px-2"
            type="password"
            name="password"
            id="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            className="bg-gray-100 rounded-lg py-1 px-2"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <Controller
            control={control}
            name="mobileNumber"
            render={({ field: { onChange, value, ref } }) => (
              <ReactPhoneInput
                inputProps={{
                  ref,
                  name: "mobileNumber",
                  required: true,
                }}
                country={"eg"}
                value={value}
                onChange={(phoneValue, countryData) => {
                  setCountryCode(countryData.countryCode.toUpperCase());
                  onChange(phoneValue);
                }}
              />
            )}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 mt-4"
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
