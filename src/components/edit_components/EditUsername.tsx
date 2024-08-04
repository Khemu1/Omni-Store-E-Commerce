import { useState } from "react";
import * as Yup from "yup";
import { getUsernameSchema } from "../../../utils/formValidations";
import { useUpdateUsername } from "../../hooks/profile";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { ThreeDots } from "react-loader-spinner";

const EditUsername = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState<string>("");
  const {
    loading,
    error: apiError,
    success,
    handleUpdateUsername,
  } = useUpdateUsername();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await getUsernameSchema().validate({ username }, { abortEarly: false });
      if (authState.user.username === username) {
        setError(
          "Your new username must be different from your current username."
        );
        return;
      }
      setError(null);
      await handleUpdateUsername(username);
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
        <h2 className="mb-4 text-xl font-semibold">Change Your Username</h2>
        <form
          className="flex flex-col gap-2 justify-center item border-2 p-4 rounded-lg"
          onSubmit={handleSubmit}
        >
          <p className="text-sm">
            If you want to change the name associated with your customer
            account, you may do so below. Be sure to click the Save Changes
            button when you are done.
          </p>
          <input
            value={username}
            type="text"
            className="input_edit_field"
            placeholder="Enter Your New Username"
            onChange={(e) => setUsername(e.target.value)}
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
              Username Has Been Updated
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

export default EditUsername;
