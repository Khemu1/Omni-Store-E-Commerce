import React from "react";

const Cards = () => {
  return (
    <section className="flex justify-center my-9">
      <div>
        <h2>Cards</h2>
        <div className="flex flex-col">
          <div>
            <div>
              <div className="flex items-center justify-center w-[85px] h-[54px] border-4 hover:cursor-pointer">
                <p className="font-semibold text-3xl text-gray-400">+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Cards;
