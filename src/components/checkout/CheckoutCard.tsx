import { CardProps } from "../../../types";

interface C {
  card: CardProps;
  isSelected: boolean;
  onSelect: () => void;
}

const CheckoutCard = ({ card, isSelected, onSelect }: C) => {
  const cardStyle = card.type === "visa" ? "visa" : "mastercard";

  return (
    <div className="flex gap-4">
      <input
        type="radio"
        id={card._id}
        value={card._id}
        name="card"
        checked={isSelected}
        onChange={onSelect}
      />
      <label htmlFor={card._id}>
        <div
          className={`flex flex-col gap-1  ${
            cardStyle === "visa" ? "text-white" : "text-black"
          } p-2 
               w-[160px] 
           rounded-lg ${cardStyle}`}
        >
          <div className="relative flex w-full justify-end mb-1">
            <div className="rccs__chip left-0"></div>
            <div className="font-semibold text-sm uppercase text-right">
              {card.type}
            </div>
          </div>

          <p className="text-right text-sm font-semibold">{card.number}</p>
          <div className="flex justify-between text-sm font-se">
            <p className="text-sm max-w-[100px] overflow-hidden text-nowrap text-ellipsis uppercase font-semibold">
              {card.name}
            </p>
            <div className="flex flex-col items-end text-sm">
              <p
                className={`text-sm ${
                  cardStyle === "visa" ? "text-mid-gray" : "text-gray-600"
                }`}
              >
                valid thru
              </p>
              <p className="overflow-hidden text-nowrap text-ellipsis ">
                {card.expiry}
              </p>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default CheckoutCard;
