import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { AxiosError } from "axios";
import ReactPhoneInput from "react-phone-input-2";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterProps, CountryProps } from "../../../types";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { getValidateRegisterSchema } from "../../../utils/formValidations";
import { useRegister } from "../../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../../types";

const Register = () => {
  type errors = any;

  const navigateTo = useNavigate();
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

  const { mutate: registerUser, error, isSuccess } = useRegister();
  const onSubmit: SubmitHandler<RegisterProps> = (data) => {
    registerUser(
      { ...data, countryCode: countryCode },
      {
        onSuccess: () => {
          navigateTo("/");
        },
      }
    );
  };
  return (
    <section className=" flex justify-center bg-white rounded-xl m-auto p-4 w-[300px] sm:w-[500px]">
      <form
        className="flex flex-col w-[75%] gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 justify-center ">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            className="input_field"
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
            className="input_field"
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
            className="input_field"
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
            className="input_field"
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
                  className: "input_field",
                }}
                country={"eg"}
                value={value}
                onChange={(phoneValue, countryData: CountryProps) => {
                  setCountryCode(countryData.countryCode.toUpperCase());
                  onChange(phoneValue);
                }}
                countryCodeEditable={false}
                inputStyle={{
                  paddingLeft: "45px",
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
          className="bg-blue-500 text-white rounded-lg py-2 mt-8 w-[75%] m-auto"
        >
          Register
        </button>
        {error && (
          <div className="text-red-500 text-sm flex justify-center">
            {(error as AxiosError<ErrorResponse>)?.response?.data?.errors
              ?.email ||
              (error as AxiosError<ErrorResponse>)?.response?.data?.errors
                ?.mobileNumber ||
              "An unexpected error occurred."}
          </div>
        )}
        {isSuccess && (
          <p className="text-green-500 ">Registration successful!</p>
        )}
      </form>
    </section>
  );
};

export default Register;
