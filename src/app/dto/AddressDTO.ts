import { Address } from "./Address";

export class AddressDTO implements Address {
    id: number;
    phone: string;
    pesel: string;
    name: string;
    surname: string;
    street: string;
  }