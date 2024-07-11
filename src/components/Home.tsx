import { SearchBar, ProductsList } from "./index";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  return (
    <section className="w-full flex flex-col p-3">
      <SearchBar />
      <ProductsList />
    </section>
  );
};

export default Home;
