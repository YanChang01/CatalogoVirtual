export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  badge: string | null;
  img: string;
  material?: string;
  isNew?: boolean;
  onSale?: boolean;
}