import {
  Transition,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FilterTypes, OptionProps } from "../../../types";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";

const Filter = ({ param, filters }: FilterTypes) => {
  const navigateTo = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<OptionProps | null>(null);

  const handleFilter = (filter: OptionProps) => {
    const params = new URLSearchParams(searchParams);
    params.set(`${param}`, filter.value);

    setSearchParams(params);
    navigateTo(`?${params.toString()}`);
  };

  useEffect(() => {
    const sortParam = searchParams.get(`${param}`);
    const foundFilter = filters.find((filter) => filter.value === sortParam);

    if (foundFilter) {
      setSelected(foundFilter);
    } else {
      setSelected(filters[0]);
    }
  }, [searchParams, filters]);

  return (
    <div className="w-fit relative">
      <Listbox
        value={selected}
        onChange={(selectedOption: OptionProps | null) => {
          if (selectedOption) {
            setSelected(selectedOption);
            handleFilter(selectedOption);
          }
        }}
      >
        <div className="relative w-fit">
          <ListboxButton className={"filter_btn"}>
            <span>{selected?.title}</span>
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
                  value={filter}
                  key={filter.title}
                  className={({ active }) =>
                    `relative cursor-default  select-none font-lato font-semibold text-sm py-2 px-4 ${
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
                      {filter.title}
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
