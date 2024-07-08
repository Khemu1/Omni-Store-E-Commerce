import { useState } from "react";
import { Input } from "@headlessui/react";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <form className="flex">
        <Input
          className="searchbar m-auto"
          type="text"
          name="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Products"
        />
      </form>
    </>
  );
};

export default SearchBar;
