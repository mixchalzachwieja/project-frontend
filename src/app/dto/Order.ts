import { Movie } from "./Movie";
import { Address } from "./Address";

export interface Order {
  id: number;
  movies: Movie[];
  address: Address;
  subtotal: number;
}