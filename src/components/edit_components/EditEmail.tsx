import { useState } from "react";
import { getEmailSchema } from "../../../utils/formValidations";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { ThreeDots } from "react-loader-spinner";
import { useUpdateEmail } from "../../hooks/profile";
import * as Yup from "yup";

const EditEmail = () => {
  const [email, setEmail] = useState("");
  const authState = useSelector((state: RootState) => state.auth);
  console.log(authState.user.email);
  const {
    loading,
    error: apiError,
    success,
    handleUpdateEmail,
  } = useUpdateEmail();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await getEmailSchema().validate({ email }, { abortEarly: false });
      if (authState.user.email === email) {
        setError("Your new email must be different from your current email.");
        return;
      }
      setError(null);
      await handleUpdateEmail(email);
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
        <h2 className="mb-4 text-xl font-semibold">Change Your Email</h2>
        <form
          className="flex flex-col gap-2 justify-center item border-2 p-4 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="text-sm">
            Current email address is :
            <span className="font-semibold"> {authState.user.email}</span>
            <br />
            <br />
            Enter the new email address you would like to associate with your
            account below
          </div>
          <input
            value={email}
            type="text"
            className="input_edit_field"
            placeholder="Enter Your New Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          )}
          {apiError && (
            <p className="text-sm font-semibold text-red-600">
              {apiError}
            </p>
          )}
          {success && (
            <p className="text-sm font-semibold text-green-600">
              Email Has Been Updated
            </p>
          )}
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

export default EditEmail;
