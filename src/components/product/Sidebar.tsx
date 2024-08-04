import { useState } from "react";
import { filters, categories, layouts } from "../../../constants/index";
import { Filter, PriceFilter } from "../index";

const Sidebar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className="flex relative flex-grow-[0] flex-shrink-[1] h-[448px]">
      {/* Sidebar content */}
      <div className="sidebar_filter_menu">
        <div className="flex flex-col gap-3">
          <h2 className="font-lato text-3xl font-semibold mb-2">Layout</h2>
          <Filter param="layout" filters={layouts} />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-lato text-3xl font-semibold mb-2">Filters</h2>
          <Filter param="sort" filters={filters} />
          <Filter param="category" filters={categories} />
          <PriceFilter />
        </div>
        <div className="arrow">
          <img
            src="/assets/icons/filter.svg"
            alt="Filters"
            className="w-[40px] h-[40px]"
          />
        </div>
      </div>

      {/* Mobile Design */}
      <div
        className={`phone_sidebar_filter_menu ${
          !isFilterOpen && "phone_sidebar_filter_menu_closed"
        }`}
      >
        <div className="flex flex-col gap-3">
          <h2 className="font-lato text-3xl font-semibold mb-2">Layout</h2>
          <Filter param="layout" filters={layouts} />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-lato text-3xl font-semibold mb-2">Filters</h2>
          <Filter param="sort" filters={filters} />
          <Filter param="category" filters={categories} />
          <PriceFilter />
        </div>
        <button onClick={handleFilterOpen} className="arrow_phone">
          <img
            src="/assets/icons/filter.svg"
            alt="Filters"
            className="w-[40px] h-[40px]"
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
