export interface ProductProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  count: number;
  rating: number;
  description: string;
  image: string;
}
export interface ScrollContextTypes {
  formRef: React.RefObject<HTMLFormElement> | null;
}
export interface FilterTypes {
  filters: OptionProps[];
}

export interface OptionProps {
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
  allProducts: ProductProps[] | [];
  loading: boolean;
  error: string | null;
}
export interface UseProductResponse {
  product: ProductProps | null;
  loading: boolean;
  error: string | null;
}
export interface ProductsListProps {
  allProducts: ProductProps[];
}
export interface DialogProps {
  isOpen: boolean;
  imagePath: string;
  closeDialog: () => void;
}
export interface ProductListProps {
  allProducts: ProductProps[];
}

export interface InfoFieldProps {
  type: string;
  title: string;
}

export interface RegisterProps {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
}
