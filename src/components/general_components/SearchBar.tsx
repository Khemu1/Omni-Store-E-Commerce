import { useEffect, useState } from "react";
import { Input } from "@headlessui/react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchParams(query.toLowerCase());
  };

  const updateSearchParams = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query !== "") {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
    console.log(params.toString());
    navigateTo(`?${params.toString()}`);
  };

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setQuery(search);
    }
  }, [searchParams]);

  return (
    <form onSubmit={handleSubmit} className="searchbar_form">
      <Input
        className="searchbar m-auto"
        type="text"
        name="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, category or description"
      />
      <button type="submit">
        <img
          src="/assets/icons/magnifying-glass.svg"
          alt="magnifying glass"
          className="object-contain"
        />
      </button>
    </form>
  );
};

export default SearchBar;
