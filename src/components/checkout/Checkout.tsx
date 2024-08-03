import React, { useEffect, useState } from "react";
import { useValidateUser } from "../../hooks/authHooks";
import { useGetCheckoutData } from "../../hooks/checkout";
import CheckoutCard from "./CheckoutCard";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutProducts from "./CheckoutProducts";
import { calcTotalPrice } from "../../../utils/cart";
import { useCreateOrder } from "../../hooks/checkout";
import { ThreeDots } from "react-loader-spinner";
import { CheckOutProps } from "../../../types";

const Checkout = () => {
  useValidateUser();
  const {
    handleGetCheckoutData,
    data,
    loading: getDataloading,
    error: getDataError,
  } = useGetCheckoutData();
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>();
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | undefined
  >();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      await handleGetCheckoutData();
    };
    fetch();
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedCardId(
        data.cards.find((card) => card.default)?._id || data.cards[0]._id
      );
      setSelectedAddressId(
        data.addresses.find((address) => address.default)?._id ||
          data.addresses[0]._id
      );
      calcTotalPrice(data.products, setTotalPrice);
    }
  }, [data]);

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const { error, loading, success, handleCreateOrder } = useCreateOrder();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (selectedCardId && selectedAddressId) {
        await handleCreateOrder({
          addressId: selectedAddressId,
          cardId: selectedCardId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="font-lato flex flex-col items-center justify-center my-9 gap-5 text-black">
      <div className="font-extrabold text-3xl flex w-full justify-center mb-8">
        <h2>Checkout</h2>
      </div>
      {getDataloading ? (
        <div className="flex justify-center">
          <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#000000"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : getDataError ? (
        <div className="flex justify-center text-red-600 font-semibold">
          {getDataError}, please try again later
        </div>
      ) : data ? (
        <div className="w-[75dvw] sm:w-full max-w-5xl flex flex-col gap-8 justify-center p-8 bg-white rounded-3xl shadow-lg m-auto">
          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8 border-b-2 py-8">
              <h2 className="font-extrabold text-lg">Your Credit Cards</h2>
              {data.cards.length > 0 &&
                data.cards.map((card) => (
                  <CheckoutCard
                    key={card._id}
                    card={card}
                    isSelected={card._id === selectedCardId}
                    onSelect={() => handleCardSelect(card._id)}
                  />
                ))}
            </div>
            <div className="flex flex-col gap-4 border-b-2 py-4">
              <h2 className="font-extrabold text-lg">Your Addresses</h2>
              {data.addresses.length > 0 &&
                data.addresses.map((address) => (
                  <CheckoutAddress
                    key={address._id}
                    address={address}
                    isSelected={address._id === selectedAddressId}
                    onSelect={() => handleAddressSelect(address._id)}
                  />
                ))}
            </div>
            <div className="flex flex-col gap-4 py-4">
              <h2 className="font-extrabold text-lg">Items In Your Cart</h2>
              {data.products.map((product) => (
                <CheckoutProducts
                  refresh={handleGetCheckoutData}
                  product={product}
                  key={product._id}
                  updatePrice={() =>
                    calcTotalPrice(data.products, setTotalPrice)
                  }
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
              <button
                type={!loading ? "submit" : "button"}
                className="bg-black text-white rounded-lg p-4 transition-all hover:bg-blue-600"
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
            {error && (
              <div className="flex justify-center text-red-600 font-semibold">
                {error}, please try again later
              </div>
            )}
            {success && (
              <div className="flex justify-center text-green-600 font-semibold">
                Order placed successfully
              </div>
            )}
          </form>
        </div>
      ) : (
        <div>Oops.., please try again later</div>
      )}
    </section>
  );
};

export default Checkout;
