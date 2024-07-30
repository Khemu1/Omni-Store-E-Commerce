export interface ProductProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  count: number;
  rating: number;
  description: string;
  image: string;
  have: boolean;
  totalPrice: number;
  quantity: number;
}
export interface ScrollContextTypes {
  formRef: React.RefObject<HTMLFormElement> | null;
}
export interface FilterTypes {
  param: string;
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

export type Products = ProductProps[];

export interface InfoFieldProps {
  type: string;
  value: string;
  name: string;
  to: string;
  style?: string;
}

export interface RegisterProps {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
  countryCode: string;
}
export interface LoginProps {
  emailOrMobile: string;
  password: string;
}

export interface CountryProps {
  countryCode: string;
  dialCode: string;
  format: string;
  name: string;
}

export interface SwiperProps {
  path: string;
}
export interface ErrorResponse {
  errors: {
    email?: string;
    mobileNumber?: string;
    message?: string;
    [key: string]: string | undefined;
  };
}

export interface AccountInfoProps {
  email: string;
  username: string;
  mobileNumber: string;
  password: string;
  [key: string]: string;
}
interface AccountAddress {
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface UpdateEmail {
  email: string;
}

export interface UpdatePassword {
  old: string;
  password: string;
}

export interface UpdateMobileNumber {
  mobileNumber: string;
}
export interface AccountAddressesProps {
  addresses: AccountAddress[];
}

export interface UpdatePasswordProps {
  currentPassword: string;
  newPassword: string;
}

export interface AddressFormProps {
  street: string;
  city: string;
  name: string;
  zipCode: string;
  country: string;
}

export interface AddressProps {
  _id: string;
  street: string;
  city: string;
  name: string;
  zipCode: string;
  country: string;
  default: boolean;
}
