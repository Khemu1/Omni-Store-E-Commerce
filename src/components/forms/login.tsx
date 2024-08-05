import { useForm, SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginProps } from "../../../types";
import "react-phone-input-2/lib/style.css";
import { getValidateLoginSchema } from "../../../utils/formValidations";
import { useLogin } from "../../hooks/authHooks";
import { useNavigate, Link } from "react-router-dom";
import { ErrorResponse } from "../../../types";

const Login = () => {
  const navigateTo = useNavigate();
  const validationSchema = getValidateLoginSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: loginUser, error, isSuccess } = useLogin();

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    loginUser(data, {
      onSuccess: () => {
        navigateTo("/");
      },
    });
  };

  return (
    <section className="flex justify-center items-center bg-white rounded-3xl shadow-[0px_0px_15px_rgba(0,0,0,.3)] h-[400px] w-[300px] sm:w-[400px]">
      <form
        className="flex flex-col w-[75%] gap-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="emailOrMobile">Email or Mobile number</label>
          <input
            {...register("emailOrMobile")}
            className="input_field"
            type="text"
            name="emailOrMobile"
            id="emailOrMobile"
          />
          {errors.emailOrMobile && (
            <p className="text-red-500 text-sm">
              {errors.emailOrMobile.message}
            </p>
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
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 mt-8 w-[75%] m-auto font-semibold"
        >
          Sign In
        </button>
        <Link
          className="font-semibold font-lato transition-all m-auto text-sm text-gray-600 hover:text-blue-700"
          to="/register"
        >
          Don't Have an Account ?
        </Link>
        {error && (
          <div className="text-red-500 text-sm flex justify-center">
            {(error as AxiosError<ErrorResponse>)?.response?.data?.errors
              ?.message || "An unexpected error occurred."}
          </div>
        )}
        {isSuccess && <p className="text-green-500">Login successful!</p>}
      </form>
    </section>
  );
};

export default Login;
