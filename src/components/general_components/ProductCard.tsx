import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductProps } from "../../../types/index";
import Grid from "../products_layout/Grid";
import List from "../products_layout/List";

interface pro {
  product: ProductProps;
  layout: string;
}

const ProductCard = ({ product, layout }: pro) => {
  return (
    <>
      {layout === "grid" ? (
        <Grid product={product} />
      ) : (
        <List product={product} />
      )}
    </>
  );
};

export default ProductCard;
