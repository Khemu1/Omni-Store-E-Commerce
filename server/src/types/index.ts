export interface ProductProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  count: number;
  rating: number;
  description: string;
  image: string;
  totalPrice?: number;
  quantity?: number;
}

export interface WishListProps {
  _id: string;
  userId: string;
  productId: string;
}
export type WishListsProps = WishListProps[];

export interface CartProps {
  _id: string;
  productId: string;
  price: number;
  quantity: number;
}

export interface SortQuery {
  [key: string]: "asc" | "desc" | 1 | -1;
}

export interface AddressProps {
  _id: string;
  addressLine: string;
  city: string;
  name: string;
  zipCode: string;
  defult: boolean;
}
