import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Order } from "../dto/Order";
import { Movie } from "../dto/Movie";
import { OrderDTO } from "../dto/OrderDTO";
import { AddressDTO } from "../dto/AddressDTO";

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {

  public movies_list: { [key: string]: Object; }[] = [
    { Name: 'Terminator: Mroczne przeznaczenie', Code: '1' },
        { Name: 'The Game Changers', Code: '2' },
        { Name: 'Dorwać Gunthera', Code: '3' }         
    ];

  public localFields: Object = { text: 'Name', value: 'Code' };
  public placeHolder: string = 'Dostępne filmy';

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  orders: Order[];
  movies: Movie[];
  public videoName: string;
  public moviesDTO: Movie[];

  constructor(private http:HttpClient) { }

  ngOnInit(){
    this.getMovies();
   }

  getMovies():void {
    this.http.get<Movie[]>("http://localhost:8080/movies").subscribe(event => this.movies = event);
  }

  saveOrderToSpring(phone, street, pesel, name, surname, mulitselection: string[], newFrom :NgForm):void {
    
    console.log(mulitselection);
    let moviesToSend = this.movies.filter(function name(params:Movie) {
      console.log(mulitselection.some(e => e.match(params.id)));
      return mulitselection.some(e => e.match(params.id));
    });
    console.log(mulitselection);
    const order = new OrderDTO();
    console.log(mulitselection);
    order.movies = moviesToSend;
    console.log(mulitselection);
    const address = new AddressDTO();
    address.phone = phone;
    address.street = street;
    address.pesel = pesel;
    address.name = name;
    address.surname = surname;
    order.address = address;
    newFrom.reset();
    this.http
    .post("http://localhost:8080/orders", JSON.stringify(order), { headers: this.headers })
    .subscribe(event => event);
  }

}
