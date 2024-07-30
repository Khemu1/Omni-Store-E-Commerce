import { useEffect, useState } from "react";
import { ProductProps } from "../../../types";
import { useDsiplayWithList } from "../../hooks/profile";
import { ThreeDots } from "react-loader-spinner";
import List from "../products_layout/List";

const WishListView = () => {

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const { loading, error, data, handleDisplayWithList } = useDsiplayWithList();

  useEffect(() => {
    handleDisplayWithList();
  }, []);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <section className="my-10 flex-col font-lato p-4">
      <h2 className="font-semibold text-xl mb-5">My Wishlist</h2>
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
        <div>Please Try Again Later</div>
      ) : products.length === 0 ? (
        <div>Start adding products to your wishlist</div>
      ) : (
        products.map((product) => (
          <List
            method={handleDisplayWithList}
            type={"wish"}
            product={product}
            key={product._id}
          />
        ))
      )}
    </section>
  );
};

export default WishListView;
