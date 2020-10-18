import { Movie } from "./Movie";

export class MovieDTO implements Movie {
    id: string;
    name: string;
    price: string;
  }