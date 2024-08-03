import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCards } from "../../hooks/profile";
import { ThreeDots } from "react-loader-spinner";
import { Card } from "../index";
const Cards = () => {
  const { handleGetCards, error, data, loading } = useGetCards();
  useEffect(() => {
    const fetchData = async () => {
      await handleGetCards();
    };
    fetchData();
  }, []);
  return (
    <section className="flex justify-center my-9 font-lato">
      {loading ? (
        <ThreeDots
          height="30"
          width="30"
          radius="9"
          color="#000000"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : error ? (
        <div>${error}</div>
      ) : data && data.cards.length > 0 ? (
        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl mb-2">Cards</h2>
          <div className="flex gap-8 flex-wrap justify-center items-center">
            <div className="flex flex-col gap-4 items-center">
              {data.cards.length < 2 && (
                <Link
                  to={"/myprofile/payment/add-card"}
                  className="flex rounded-lg items-center justify-center w-[210px] h-[110px] border-4 hover:cursor-pointer"
                >
                  <p className="font-semibold text-3xl text-gray-400">+</p>
                </Link>
              )}

              {data.cards.map((card) => (
                <Card
                  card={card}
                  key={card._id}
                  onDisplay={false}
                  refresh={handleGetCards}
                />
              ))}
            </div>
            {data.defaultCard && (
              <Card
                card={data.defaultCard}
                key={data.defaultCard._id}
                onDisplay={true}
                refresh={handleGetCards}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <Link
              to={"/myprofile/payment/add-card"}
              className="flex rounded-lg items-center justify-center w-[210px] h-[110px] border-4 hover:cursor-pointer"
            >
              <p className="font-semibold text-3xl text-gray-400">+</p>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Cards;
