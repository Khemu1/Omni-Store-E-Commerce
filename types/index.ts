export interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
export interface ScrollContextTypes {
  formRef: React.RefObject<HTMLFormElement> | null; // because the default value is null;
}
export interface FilterTypes {
  filters: string[];
  setAllProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  allProdcuts: ProductProps[];
}
