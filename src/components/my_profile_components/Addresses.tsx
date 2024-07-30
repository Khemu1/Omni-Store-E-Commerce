import { Link } from "react-router-dom";
import { useGetAddresses } from "../../hooks/profile";
import { ThreeDots } from "react-loader-spinner";
import { Address } from "../index";
import { useEffect } from "react";

const Addresses = () => {
  const {
    loading: loadingAddresses,
    handleGetAddresses,
    data: addresses,
  } = useGetAddresses();
  useEffect(() => {
    handleGetAddresses();
  }, []);
  return (
    <section className="flex justify-center font-lato my-8">
      {loadingAddresses ? (
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
          <div className="flex flex-col">
            <div className="flex justify-center mb-4">
              <h2 className="font-semibold text-xl  sm:text-2xl">
                Your Addresses
              </h2>
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              {addresses.length !== 2 && (
                <Link
                  to="/myprofile/addresses/new-address"
                  className="create_address_box"
                >
                  <p className="font-semibold">Add A New Address</p>
                  <p className="text-gray-700 text-6xl">+</p>
                </Link>
              )}
              {addresses &&
                addresses.length !== 0 &&
                addresses.map((address) => (
                  <Address
                    key={address._id}
                    address={address}
                    refresh={handleGetAddresses}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Addresses;
