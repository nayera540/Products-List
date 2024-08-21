import { Product } from '../product';

export interface ProductResponse {
  totalCount: number;
  productsData: Product[];
}
