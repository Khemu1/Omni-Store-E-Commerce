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
export const getValidateRegisterSchema = () => {
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
      .test("valid-phone", "Invalid phone number", function (value) {
        const { countryCode } = this.parent;
        if (!value || !countryCode) return false;
        const isValid = validatePhoneNumber(value, countryCode);
        return isValid;
      }),
  });
};

export const getValidateLoginSchema = () => {
  return Yup.object().shape({
    emailOrMobile: Yup.string()
      .required("Please Enter your email address or mobile number")
      .label("Email"),
    password: Yup.string().required("Password is required"),
  });
};

export const getUsernameSchema = () => {
  return Yup.object().shape({
    username: Yup.string()
      .required("Please enter a valid username")
      .min(5, "Username should be at least 5 characters")
      .label("Username"),
  });
};

export const getEmailSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required")
      .label("Email"),
  });
};

export const getPasswordSchema = () => {
  return Yup.object().shape({
    currentPassword: Yup.string().required(
      "Please Enter your current password"
    ),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .label("Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
      .required("Confirm Password is required")
      .label("Confirm Password"),
  });
};

export const getMobileNumberSchema = (
  mobileNumber: string,
  countryCode: string
) => {
  return Yup.object().shape({
    mobileNumber: Yup.string()
      .required("Phone number is required")
      .test("valid-phone", "Invalid phone number", () => {
        if (!mobileNumber) return false;
        const isValid = validatePhoneNumber(mobileNumber, countryCode);
        return isValid;
      }),
  });
};

export const getAddressSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string()
      .required("Zip Code is required")
      .matches(/^[0-9]{5}$/, "Zip Code should be a 5-digit number"),
  });
};

export const getCardSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name on card is required"),
    type: Yup.string()
      .required("Type is required")
      .test(
        "is-valid-type",
        "Type must be either visa or master card",
        (value) => value === "visa" || value === "mastercard"
      ),
    cvc: Yup.string()
      .required("CVC is required")
      .matches(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
    expiry: Yup.string()
      .required("Expiry date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
        "Expiry date must be in MM/YY format"
      ),
    number: Yup.string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be 16 digits"),
  });
};
