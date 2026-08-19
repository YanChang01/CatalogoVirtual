export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface CategoryWithCount {
  name: string;
  count: number;
}
