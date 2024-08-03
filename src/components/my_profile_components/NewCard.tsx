import { useState, ChangeEvent, FocusEvent } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import cardType from "credit-card-type";
import { CardFormProps } from "../../../types";
import * as Yup from "yup";
import {
  getCardSchema,
  transformYupErrorsIntoObject,
} from "../../../utils/formValidations";
import { ThreeDots } from "react-loader-spinner";
import { useAddCard } from "../../hooks/profile";

const getCardType = (number: string) => {
  // Remove spaces and dashes from the card number
  const cleanedNumber = number.replace(/\D/g, "");
  console.log(cleanedNumber);

  // Get card information
  const cardInfo = cardType(cleanedNumber);

  // Check if cardInfo contains data and return the type or null
  if (cardInfo.length > 0) {
    return cardInfo[0].type;
  } else {
    console.log(
      `Card number ${cleanedNumber} did not match any known card types.`
    );
    return null;
  }
};

interface CardsErrors {
  number: string | null;
  expiry: string | null;
  cvc: string | null;
  name: string | null;
  type: string | null;
}

const acceptedCardTypes: string[] = ["visa", "mastercard"];

const NewCard = () => {
  const { loading, error, handleAddCard, success } = useAddCard();
  const [state, setState] = useState<CardFormProps>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    type: "",
  });
  const [errors, setErrors] = useState<CardsErrors>({
    number: null,
    expiry: null,
    cvc: null,
    name: null,
    type: null,
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    let newValue = value;
    if (name === "number") {
      // Format card number
      newValue = value
        .replace(/\D/g, "") // Remove all non-digit characters
        .replace(/(.{4})/g, "$1 ") // Add space every 4 digits
        .trim(); // Remove trailing spaces

      if (newValue.length > 19) {
        newValue = newValue.slice(0, 19); // Limit to 19 characters (16 digits + spaces)
      }
    }

    if (name === "expiry") {
      // Format expiry date
      newValue = value.replace(/\D/g, ""); // Remove all non-digit characters
      if (newValue.length > 2) {
        newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`; // Add slash between month and year
      }
      if (newValue.length > 5) {
        newValue = newValue.slice(0, 5); // Limit to MM/YY format
      }
    }
    if (name === "cvc") {
      // Limit CVC to 3 digits
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    // Update state
    setState((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const cardSchema = getCardSchema();
    const detectedCardType = getCardType(state.number.replace(/\s/g, "")); // Remove spaces for card type detection
    const card: CardFormProps = {
      ...state,
      number: state.number.split(" ").join(""),
      type: detectedCardType || "",
    };
    try {
      setErrors({
        number: null,
        expiry: null,
        cvc: null,
        name: null,
        type: null,
      });
      await cardSchema.validate(card, { abortEarly: false });
      if (detectedCardType && !acceptedCardTypes.includes(detectedCardType)) {
        alert("Card type not accepted. Only Visa and MasterCard are accepted");
        return;
      }
      handleAddCard(card);
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const newErrors = transformYupErrorsIntoObject(validationErrors);
        setErrors((prev) => ({ ...prev, ...newErrors }));
      }
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto px-2 py-6 sm:px-4 bg-white shadow-md rounded-lg my-9 gap-6 ">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
      />
      <form className="flex flex-col mt-6 gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name on Card"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`input_field ${errors.name ? "border-red-600" : ""}`}
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`input_field ${
              errors.number || errors.type ? "border-red-600" : ""
            }`}
          />
          {errors.number && (
            <div className="text-red-500 text-sm">{errors.number}</div>
          )}
          {errors.type && (
            <div className="text-red-500 text-sm">{errors.type}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="expiry"
            placeholder="Expiry Date (MM/YY)"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`input_field ${errors.expiry ? "border-red-600" : ""}`}
          />
          {errors.expiry && (
            <div className="text-red-500 text-sm">{errors.expiry}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`input_field ${errors.cvc ? "border-red-600" : ""}`}
          />
          {errors.cvc && (
            <div className="text-red-500 text-sm">{errors.cvc}</div>
          )}
        </div>

        <div className="flex justify-centers">
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
        </div>
        <div className="flex justify-center">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">Card Has Been Added</div>}
        </div>
      </form>
    </div>
  );
};

export default NewCard;
