import { useEffect, useState } from "react";
import ReactPhoneInput from "react-phone-input-2";
import { CountryProps } from "../../../types";
import { getMobileNumberSchema } from "../../../utils/formValidations";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { ThreeDots } from "react-loader-spinner";
import { useUpdateMobileNumber } from "../../hooks/profile";
import * as Yup from "yup";

const EditMobile = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const [mobileNumber, SetMobileNumber] = useState(
    authState.user.mobileNumber || ""
  );
  const [countryCode, setCountryCode] = useState("");

  const {
    loading,
    error: apiError,
    success,
    handleUpdateMobileNumber,
  } = useUpdateMobileNumber();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await getMobileNumberSchema(mobileNumber, countryCode).validate(
        { mobileNumber, countryCode },
        { abortEarly: false }
      );
      if (authState.user.mobileNumber === mobileNumber) {
        setError(
          "Your new Mobile Number must be different from your current Mobile Number."
        );
        return;
      }
      setError(null);
      await handleUpdateMobileNumber(mobileNumber);
    } catch (validationError: any) {
      if (validationError instanceof Yup.ValidationError) {
        setError(validationError.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <section className="flex justify-center font-lato my-10">
      <div className="flex flex-col w-[340px] sm:w-[500px]">
        <h2 className="mb-4 text-xl font-semibold">
          Change Your Mobile Phone Number
        </h2>
        <form
          className="flex flex-col gap-4 justify-center item border-2 p-4 rounded-lg "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 ">
            <label>Enter You New Mobile Phone Number</label>
            <ReactPhoneInput
              inputProps={{
                name: "mobileNumber",
                required: true,
                containerstyle: {
                  width: "200px",
                },
              }}
              country={"eg"}
              value={mobileNumber}
              onChange={(phoneValue, countryData: CountryProps) => {
                SetMobileNumber(phoneValue);
                setCountryCode(countryData.countryCode);
              }}
              inputStyle={{
                paddingLeft: "45px",
              }}
            />
          </div>
          <div>
            {error && (
              <p className="text-sm font-semibold text-red-600">{error}</p>
            )}
            {apiError && (
              <p className="text-sm font-semibold text-red-600">
                {apiError.message}
              </p>
            )}
            {success && (
              <p className="text-sm font-semibold text-green-600">
                Email Has Been Updated
              </p>
            )}
          </div>

          <div className="flex items-end mt-4">
            <button
              type={loading ? "button" : "submit"}
              className={loading ? "" : "edit_button"}
              disabled={loading}
            >
              {loading ? (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="#000000"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditMobile;
