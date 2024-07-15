import * as Yup from "yup";
import { PhoneNumberUtil, PhoneNumber } from "google-libphonenumber";

// Transform Yup errors into a usable object.
export const transformYupErrorsIntoObject = (errors: Yup.ValidationError) => {
  const validationErrors: Record<string, string> = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
};

const phoneUtil = PhoneNumberUtil.getInstance();

const validatePhoneNumber = (value: string, countryCode: string): boolean => {
  try {
    const phoneNumber: PhoneNumber = phoneUtil.parseAndKeepRawInput(
      value,
      countryCode
    );
    return phoneUtil.isValidNumber(phoneNumber);
  } catch (error) {
    return false;
  }
};

export const getValidateRegisterSchema = (countryCode: string) => {
  return Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required")
      .label("Email"),
    username: Yup.string()
      .required("Please enter a valid username")
      .min(5, "Username should be at least 5 characters")
      .label("Username"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .label("Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required")
      .label("Confirm Password"),
    mobileNumber: Yup.string()
      .required("Phone number is required")
      .test("valid-phone", "Invalid phone number", (value) => {
        if (!value) return false;
        console.log("MobileNumber:", value);
        const isValid = validatePhoneNumber(value, countryCode);
        return isValid;
      }),
  });
};
