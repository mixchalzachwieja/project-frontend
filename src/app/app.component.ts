import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  orders: Order[];
  movies: Movie[];
  public videoName: string;s
  public phone = '';
  public address = '';
  public pesel = '';
  public name = '';
  public surname = '';
  public movieDTO: Movie;

  constructor(private http:HttpClient) {
    
  }

   ngOnInit(){
    this.getDateFromSpring();
    this.getMovies();
   }

  saveOrderToSpring():void {
    const order = new OrderDTO();
    order.movie = this.movieDTO;
    order.phone = this.phone;
    order.address = this.address;
    order.pesel = this.pesel;
    order.name = this.name;
    order.surname = this.surname;
    this.http
    .post("http://localhost:8080/orders", JSON.stringify(order), { headers: this.headers })
    .subscribe(event => {
      this.phone = '';
      this.address = '';
      this.pesel = '';
      this.name = '';
      this.surname = '';
      this.getDateFromSpring();
    });
  }

  getDateFromSpring():void {
    this.http.get<Order[]>("http://localhost:8080/orders").subscribe(event => this.orders = event);
  }

  remove(event: any):void {
    this.http.delete("http://localhost:8080/orders/" + event.target.name).subscribe(event => this.getDateFromSpring());
    this.getDateFromSpring();
  }

  getMovies():void {
    this.http.get<Movie[]>("http://localhost:8080/movies").subscribe(event => this.movies = event);
  }

  movieSet(event: any):void {
    this.movieDTO = new MovieDTO();
    this.movieDTO.name = event.target.name;
    this.movieDTO.id = event.target.value;
  }

}

class OrderDTO implements Order {
  id: number;
  movie: Movie;
  phone: string;
  address: string;
  pesel: string;
  name: string;
  surname: string;
}

interface Order {
  id: number;
  movie: Movie;
  phone: string;
  address: string;
  pesel: string;
  name: string;
  surname: string;
}

class MovieDTO implements Movie {
  id: number;
  name: string;
  price: string;
}

interface Movie {
  id: number;
  name: string;
  price: string;
}