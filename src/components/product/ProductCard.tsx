import { ProductProps } from "../../../types/index";
import { useAddToCart } from "../../hooks/cart";
import Grid from "../products_layout/Grid";
import List from "../products_layout/List";

interface pro {
  product: ProductProps;
  layout: string;
}

const ProductCard = ({ product, layout }: pro) => {
  const { error, handleAddToCart } = useAddToCart();

  const handleCartClick = async () => {
    try {
      handleAddToCart(product._id);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };
  return (
    <>
      {layout === "grid" ? (
        <Grid product={product} />
      ) : (
        <List
          product={product}
          type={"normal"}
          handleCartClick={handleCartClick}
          handleCartClickError={error}
        />
      )}
    </>
  );
};

export default ProductCard;
