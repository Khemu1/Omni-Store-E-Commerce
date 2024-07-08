import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

import { FilterTypes } from "../../types";

import { useState } from "react";

const Filter = ({ allProdcuts, setAllProducts, filters }: FilterTypes) => {
  const [filterBy, setFilterBy] = useState(filters[0]);
  const [query, setQuery] = useState("");
  return (
    <div className="relative">
      <Combobox
        value={filterBy}
        onChange={setAllProducts}
        onClose={() => setQuery("")}
      >
        <ComboboxInput
          displayValue={(filterBy: string) => filterBy}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ComboboxOptions className="border absolute empty:invisible">
          {filters.map((filter) => (
            <ComboboxOption
              key={filter}
              value={filter}
              className="data-[focus]:bg-blue-100"
            >
              {filter}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

export default Filter;
