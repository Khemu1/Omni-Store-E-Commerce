import { useState } from "react";
import * as Yup from "yup";
import { AxiosError } from "axios";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRegister } from "../../hooks/authHooks";
import { RegisterProps, CountryProps } from "../../../types";
import { Link } from "react-router-dom";
import { ErrorResponse } from "../../../types";
import {
  getValidateRegisterSchema,
  transformYupErrorsIntoObject,
} from "../../../utils/formValidations";

const Register = () => {
  const [formData, setFormData] = useState<RegisterProps>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    countryCode: "EG",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { error, handleUseRegister, success } = useRegister();

  const validationSchema = getValidateRegisterSchema();

  const validateForm = () => {
    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      setFormErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setFormErrors(transformYupErrorsIntoObject(err));
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await handleUseRegister(formData);
      } catch (error) {
        console.log("Error during registration:", error);
      }
    }
  };

  return (
    <section className="flex justify-center bg-white rounded-3xl shadow-[0px_0px_15px_rgba(0,0,0,.3)] m-auto py-8 w-[300px] sm:w-[400px]">
      <form className="flex flex-col w-[75%] gap-4" onSubmit={handleSubmit}>
        <div className="input_field_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="input_field"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>
        <div className="input_field_container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input_field"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {formErrors.username && (
            <p className="text-red-500 text-sm">{formErrors.username}</p>
          )}
        </div>
        <div className="input_field_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input_field"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          )}
        </div>
        <div className="input_field_container">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="input_field"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
          )}
        </div>
        <div className="input_field_container">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <ReactPhoneInput
            inputProps={{
              name: "mobileNumber",
              required: true,
              className: "input_field",
            }}
            country={formData.countryCode}
            value={formData.mobileNumber}
            onChange={(phoneValue, countryData: CountryProps) => {
              setFormData({
                ...formData,
                mobileNumber: phoneValue,
                countryCode: countryData.countryCode.toUpperCase(),
              });
            }}
            inputStyle={{
              paddingLeft: "45px",
            }}
          />
          {formErrors.mobileNumber && (
            <p className="text-red-500 text-sm">{formErrors.mobileNumber}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 mt-8 w-[75%] m-auto"
        >
          Register
        </button>
        <Link
          className="font-semibold font-lato transition-all m-auto text-sm text-gray-600 hover:text-blue-700"
          to="/login"
        >
          Already Have an Account ?
        </Link>
        {error && (
          <div className="text-red-500 text-sm flex justify-center">
            {(error as unknown as AxiosError<ErrorResponse>)?.response?.data
              ?.errors?.email ||
              (error as unknown as AxiosError<ErrorResponse>)?.response?.data
                ?.errors?.mobileNumber ||
              "An unexpected error occurred."}
          </div>
        )}
        {success && <p className="text-green-500">Registration successful!</p>}
      </form>
    </section>
  );
};

export default Register;
