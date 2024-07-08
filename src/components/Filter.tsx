import {
  Transition,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FilterTypes } from "../../types";

import { useState, Fragment } from "react";

const Filter = ({ allProdcuts, setAllProducts, filters }: FilterTypes) => {
  const [selected, setSelected] = useState(filters[0].value);
  return (
    <div className="w-fit relative">
      <Listbox value={selected} onChange={(e) => setSelected(e)}>
        <div className="relative w-fit z-10">
          <ListboxButton className={"filter_btn"}>
            <span>Sort By: {selected}</span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="filter_menu">
              {filters.map((filter) => (
                <ListboxOption
                  value={filter.value}
                  key={filter.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-blue-800 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-light"
                      }`}
                    >
                      {filter.value}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Filter;
