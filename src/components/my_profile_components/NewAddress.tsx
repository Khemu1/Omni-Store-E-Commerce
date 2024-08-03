import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddressFormProps } from "../../../types";
import { getAddressSchema } from "../../../utils/formValidations";
import { useAddAddress } from "../../hooks/profile";
import { ThreeDots } from "react-loader-spinner";
const NewAddress = () => {
  const { error, loading, handleAddAddress, success } = useAddAddress();
  const addressSchema = getAddressSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<AddressFormProps>({
    resolver: yupResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<AddressFormProps> = async (data) => {
    try {
      console.log(data);
      await handleAddAddress(data);
    } catch (error) {
      console.error("Failed to add new address:", error);
    }
  };

  const handleInputChange = (name: keyof AddressFormProps) => {
    clearErrors(name);
  };

  return (
    <section className="my-9 font-lato">
      <div className="flex justify-center bg-white rounded-3xl shadow-[0px_0px_15px_rgba(0,0,0,.3)] m-auto py-8 w-[300px] sm:w-[400px]">
        <form
          className="flex flex-col w-[75%] gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center mb-5">
            <h3 className="font-semibold">Create A New Address</h3>
          </div>

          <div className="input_field_conatiner">
            <label>Full name (First and Last name)</label>
            <input
              {...register("name")}
              type="text"
              name="name"
              className={`input_field ${errors.name ? "border-red-600" : ""}`}
              onChange={() => handleInputChange("name")}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <div className="input_field_conatiner">
            <label>street</label>
            <input
              {...register("street")}
              type="text"
              name="street"
              className={`input_field ${errors.street ? "border-red-600" : ""}`}
              onChange={() => handleInputChange("street")}
            />
          </div>
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street.message}</p>
          )}

          <div className="input_field_conatiner">
            <label>City</label>
            <input
              {...register("city")}
              type="text"
              name="city"
              className={`input_field ${errors.city ? "border-red-600" : ""}`}
              onChange={() => handleInputChange("city")}
            />
          </div>
          <div className="input_field_conatiner">
            <label>country</label>
            <input
              {...register("country")}
              type="text"
              name="country"
              className={`input_field ${errors.city ? "border-red-600" : ""}`}
              onChange={() => handleInputChange("country")}
            />
          </div>
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}

          <div className="input_field_conatiner">
            <label>Zip Code</label>
            <input
              {...register("zipCode")}
              type="text"
              name="zipCode"
              className={`input_field ${
                errors.zipCode ? "border-red-600" : ""
              }`}
              onChange={() => handleInputChange("zipCode")}
            />
          </div>
          {errors.zipCode && (
            <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
          )}

          <button
            type="submit"
            className="mt-2 text-white text-lg bg-black w-max m-auto px-6 rounded-xl"
          >
            {loading ? (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            ) : (
              "Save"
            )}
          </button>
          <div className="flex justify-center">
            {success && (
              <p className="text-green-600 text-sm">
                Address added successfully.
              </p>
            )}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewAddress;
