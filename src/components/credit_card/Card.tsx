import { Link } from "react-router-dom";
import { CardProps } from "../../../types";
import { useSetCardDefault } from "../../hooks/card";
import { useDeleteCard } from "../../hooks/card";
interface c {
  card: CardProps;
  onDisplay: boolean;
  refresh: () => Promise<() => void>;
}

const Card = ({ card, onDisplay, refresh }: c) => {
  const { handleDeleteCard, error: deleteError } = useDeleteCard();
  const { handleSetCardDefault, error } = useSetCardDefault();

  const cardStyle = card.type === "visa" ? "visa" : "mastercard";
  const display = card.default === true && onDisplay === false ? false : true;
  const handleSetDefault = async () => {
    if (onDisplay === false && card.default === false) {
      console.log("setting default");
      await handleSetCardDefault(card._id);
      if (refresh) refresh();
    }
  };
  const handleDelete = async () => {
    if (onDisplay === true) {
      try {
        await handleDeleteCard(card._id);
        refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div
      className={` cursor-pointer ${display === true ? "" : "defaultCard"} ${
        onDisplay === true ? "flex items-center" : ""
      }`}
    >
      <div className={`${onDisplay === true ? "onDsiplayCard" : ""}`}>
        {onDisplay === true && (
          <div className=" px-2 flex justify-start w-full border-b-4 border-black font-lato font-extrabold text-xl">
            <h2>Default</h2>
          </div>
        )}
        <div
          onClick={handleSetDefault}
          className={`flex flex-col gap-1  ${
            cardStyle === "visa" ? "text-white" : "text-black"
          } p-2 ${
            onDisplay
              ? "w-[240px] h-[150px] justify-between "
              : "w-[210px] h-[115px]"
          } rounded-lg ${cardStyle}`}
        >
          <div className="relative flex w-full justify-end mb-1">
            <div className="rccs__chip left-0"></div>
            <div className="font-semibold text-xl uppercase text-right">
              {card.type}
            </div>
          </div>

          <p className="text-right font-semibold">{card.number}</p>
          <div className="flex justify-between text-sm font-se">
            <p className="text-sm max-w-[100px] overflow-hidden text-nowrap text-ellipsis uppercase font-semibold">
              {card.name}
            </p>
            <div className="flex flex-col items-end">
              <p
                className={`text-sm ${
                  cardStyle === "visa" ? "text-mid-gray" : "text-gray-600"
                }`}
              >
                valid thru
              </p>
              <p className="overflow-hidden text-nowrap text-ellipsis">
                {card.expiry}
              </p>
            </div>
          </div>
        </div>
        {onDisplay === true && (
          <div className="flex w-full px-2 border-t-2 gap-3 font-semibold">
            <Link
              to={`/myprofile/payment/edit-card?id=${card._id}`}
              className="text-blue-400 hover:text-blue-600"
            >
              Edit
            </Link>
            <button
              className="text-blue-400 hover:text-blue-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {error && <div>{error}</div>}
      {deleteError && <div>{deleteError}</div>}
    </div>
  );
};

export default Card;
