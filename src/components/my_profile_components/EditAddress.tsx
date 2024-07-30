import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddressFormProps, AddressProps } from "../../../types";
import { getAddressSchema } from "../../../utils/formValidations";
import { useUpdateAddress } from "../../hooks/profile";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAddress } from "../../hooks/profile";

type CommonAddressProps = AddressFormProps & AddressProps;
type AddressKeys = keyof AddressFormProps;
type CurrentAddressKeys = keyof CommonAddressProps;

const EditAddress = () => {
  const [addressChangeError, setAddressChangeError] = useState<null | string>(
    null
  );
  const {
    error: updateAddressError,
    loading: updateAddressLoading,
    success: updateAddressSuccess,
    handleUpdateAddress,
  } = useUpdateAddress();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const {
    error: getAddressError,
    loading: getAddressLoading,
    data: getAddressData,
  } = useGetAddress(id ?? "");

  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(
    null
  );

  const addressSchema = getAddressSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<AddressFormProps>({
    resolver: yupResolver(addressSchema),
  });

  useEffect(() => {
    setCurrentAddress(getAddressData);
  }, [getAddressData]);

  const onSubmit: SubmitHandler<AddressFormProps> = async (data) => {
    const keys: AddressKeys[] = [
      "name",
      "street",
      "city",
      "country",
      "zipCode",
    ];

    let hasChanges = false;
    if (currentAddress) {
      hasChanges = keys.some(
        (key) => data[key] !== currentAddress[key as CurrentAddressKeys]
      );
    }

    if (!hasChanges) {
      setAddressChangeError("No changes detected. Please make a change.");
      return;
    }

    try {
      if (id) await handleUpdateAddress(id, data);
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  const handleInputChange = (name: keyof AddressFormProps) => {
    clearErrors(name);
  };

  return (
    <section className="my-9 font-lato">
      {getAddressLoading ? (
        <ThreeDots
          height="30"
          width="30"
          radius="9"
          color="#000000"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : getAddressError ? (
        <p className="text-red-600 text-sm">
          Couldn't retrieve current address, please try again later
        </p>
      ) : (
        currentAddress && (
          <div className="flex justify-center bg-white rounded-3xl shadow-[0px_0px_15px_rgba(0,0,0,.3)] m-auto py-8 w-[300px] sm:w-[400px]">
            <form
              className="flex flex-col w-[75%] gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-center mb-5">
                <h3 className="font-semibold">Update Your Current Address</h3>
              </div>

              <div className="input_field_container">
                <label>Full name (First and Last name)</label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  defaultValue={currentAddress.name}
                  className={`input_field ${
                    errors.name ? "border-red-600" : ""
                  }`}
                  onChange={() => handleInputChange("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <div className="input_field_container">
                <label>Street</label>
                <input
                  {...register("street")}
                  type="text"
                  name="street"
                  defaultValue={currentAddress.street}
                  className={`input_field ${
                    errors.street ? "border-red-600" : ""
                  }`}
                  onChange={() => handleInputChange("street")}
                />
              </div>
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}

              <div className="input_field_container">
                <label>City</label>
                <input
                  {...register("city")}
                  type="text"
                  name="city"
                  defaultValue={currentAddress.city}
                  className={`input_field ${
                    errors.city ? "border-red-600" : ""
                  }`}
                  onChange={() => handleInputChange("city")}
                />
              </div>
              <div className="input_field_container">
                <label>Country</label>
                <input
                  {...register("country")}
                  type="text"
                  name="country"
                  defaultValue={currentAddress.country}
                  className={`input_field ${
                    errors.country ? "border-red-600" : ""
                  }`}
                  onChange={() => handleInputChange("country")}
                />
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}

              <div className="input_field_container">
                <label>Zip Code</label>
                <input
                  {...register("zipCode")}
                  type="text"
                  name="zipCode"
                  defaultValue={currentAddress.zipCode}
                  className={`input_field ${
                    errors.zipCode ? "border-red-600" : ""
                  }`}
                  onChange={() => handleInputChange("zipCode")}
                />
              </div>
              {errors.zipCode && (
                <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
              )}
              <div className="flex justify-center">
                {updateAddressSuccess && (
                  <p className="text-green-600 text-sm">
                    Address updated successfully.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-2 text-white text-lg bg-black w-max m-auto px-6 rounded-xl"
              >
                {updateAddressLoading ? (
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
              {updateAddressError && (
                <p className="text-red-600 text-sm m-auto">
                  Failed to update address, please try again later.
                </p>
              )}
              {addressChangeError && (
                <p className="text-red-600 text-sm m-auto">
                  {addressChangeError}
                </p>
              )}
            </form>
          </div>
        )
      )}
    </section>
  );
};

export default EditAddress;
