import { useState } from "react";
import * as Yup from "yup";
import { getPasswordSchema } from "../../../utils/formValidations";
import { useUpdatePassword } from "../../hooks/profile";
import { ThreeDots } from "react-loader-spinner";
const EditPassword = () => {
  const [value, setValue] = useState({
    currentPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const {
    loading,
    error: apiError,
    success,
    handleUpdatePassword,
  } = useUpdatePassword();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(value).some((v) => v.trim() === "")) {
      return alert("Please Fill Out All Fields");
    }
    const schema = getPasswordSchema();
    try {
      setError(null);
      const { currentPassword, newPassword, confirm } = value;
      await schema.validate({
        currentPassword: currentPassword,
        newPassword,
        confirmPassword: confirm,
      });

      handleUpdatePassword({ currentPassword, newPassword });
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        setError(validationError.message);
      } else {
        console.log(validationError);
        setError("An error occurred");
      }
    }
  };
  return (
    <section className="flex justify-center font-lato my-10">
      <div className="flex flex-col w-[340px] sm:w-[500px]">
        <h2 className="mb-4 text-xl font-semibold">Change Your Password</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center item border-2 p-4 rounded-lg"
        >
          <p className="text-sm">
            Use the form below to change the password for your account .
          </p>
          <div className="flex flex-col gap-2">
            <label>Current Password</label>
            <input
              value={value.currentPassword}
              type="password"
              className="input_edit_field"
              placeholder="Enter Your Current"
              onChange={(e) =>
                setValue({ ...value, currentPassword: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>New Password</label>
            <input
              value={value.newPassword}
              type="password"
              className="input_edit_field"
              placeholder="Enter Your New Password"
              onChange={(e) =>
                setValue({ ...value, newPassword: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Confirm New Password</label>
            <input
              value={value.confirm}
              type="password"
              className="input_edit_field"
              placeholder="Re-enter Your New Password"
              onChange={(e) => setValue({ ...value, confirm: e.target.value })}
            />
          </div>
          <div className="flex items-end mt-4">
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
                Username Has Been Updated
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

export default EditPassword;
