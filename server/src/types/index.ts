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

export interface SortQuery {
  [key: string]: "asc" | "desc" | 1 | -1;
}
