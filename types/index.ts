export interface ProductProps {
  id: string;
  title: string;
  price: number;
  category: string;
  count: number;
  rating: number;
  description: string;
  image: string;
}
export interface ScrollContextTypes {
  formRef: React.RefObject<HTMLFormElement> | null; // because the default value is null;
}
export interface FilterTypes {
  filters: OptionProps[];
}

interface OptionProps {
  title: string;
  value: string;
}

export interface FooterProps {
  name: string;
  links: Footer[];
}

export interface Footer {
  title: string;
  url: string;
}
export interface UseProductsResponse {
  allProducts: ProductProps[];
  loading: boolean;
  error: string | null;
}
export interface ProductsListProps {
  allProducts: ProductProps[];
}
