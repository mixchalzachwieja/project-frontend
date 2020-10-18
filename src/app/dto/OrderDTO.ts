import { Address } from "./Address";
import { Movie } from "./Movie";
import { Order } from "./Order";

export class OrderDTO implements Order {
    id: number;
    movies: Movie[];
    address: Address;
    subtotal: number;
  }