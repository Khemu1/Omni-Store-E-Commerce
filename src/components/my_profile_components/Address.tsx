import { ThreeDots } from "react-loader-spinner";
import { AddressProps } from "../../../types";
import { useSetAddressesAsDefault } from "../../hooks/profile";
import { Link } from "react-router-dom";
import { useDeleteAddress } from "../../hooks/profile";

interface Address {
  address: AddressProps;
  refresh: () => Promise<void>;
}
const Address = ({ address, refresh }: Address) => {
  const { handleDeleteAddress, error: deleteError } = useDeleteAddress();
  const {
    handleSetAddressesAsDefault,
    loading: settingDefault,
    error: setDefaultError,
  } = useSetAddressesAsDefault();
  const handleSetDefault = async () => {
    try {
      await handleSetAddressesAsDefault(address._id);
      await refresh();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      await handleDeleteAddress(address._id);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const neededKeys = ["name", "street", "country", "city", "zipCode"];
  const labels: { [key: string]: string } = {
    name: "Fullname",
    street: "Street",
    country: "Country",
    city: "City",
    zipCode: "Zip Code",
  };

  return (
    <div className="address_box py-1 font-lato">
      {address.default && (
        <div className="border-b-2 border-b-black w-full p-1 font-semibold ">
          Default
        </div>
      )}
      <div className="flex flex-col gap-2 py-1 px-2 my-2 w-full h-full overflow-hidden">
        {neededKeys.map((key) => (
          <div className="address_box_field" key={key}>
            <p className="text-sm font-semibold">{labels[key]} :</p>
            <p className="text-gray-500 text-sm font-semibold">
              {address[key as keyof AddressProps]}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t-2 w-full p-1 text-sm font-semibold">
        {settingDefault ? (
          <ThreeDots
            height="30"
            width="30"
            radius="9"
            color="#000000"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        ) : (
          <>
            <button type="button" className="text-blue-400 hover:text-blue-600">
              <Link to={`/myprofile/addresses/edit-address?id=${address._id}`}>
                Edit
              </Link>
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-blue-400 hover:text-blue-600"
            >
              Delete
            </button>
            {!address.default && (
              <button
                type="button"
                className="text-blue-400 hover:text-blue-600"
                onClick={handleSetDefault}
              >
                Set as default
              </button>
            )}
          </>
        )}
        {setDefaultError && (
          <p className="text-red-600 text-sm mt-2">
            Failed to set address as default, please try again later
          </p>
        )}
        {deleteError && (
          <p className="text-red-600 text-sm mt-2">
            Failed to set address as default, please try again later
          </p>
        )}
      </div>
    </div>
  );
};

export default Address;
