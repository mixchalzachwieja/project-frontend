import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from "../dto/Order";
import { Movie } from "../dto/Movie";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  orders: Order[];
  movies: Movie[];
  public videoName: string;
  public moviesDTO: Movie[];
  public total = 0;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getDateFromSpring();
  }

  getDateFromSpring():void {
    this.http.get<Order[]>("http://localhost:8080/orders").subscribe(
      event => {
        this.orders = event;
        this.calculateTotal();
      });
  }

  remove(event: any):void {
    console.log(event.target.name);
    this.http.delete("http://localhost:8080/orders/" + event.target.name).subscribe(
      event => {
        this.getDateFromSpring();
        this.calculateTotal();
      });
    this.getDateFromSpring();
  }

  calculateTotal():void {
    this.total = this.orders.map(function(order){
      return order.subtotal;
  }).reduce((x, y) => x + y);
    if (this.orders.length === 0) {
      this.total = 0;
    }
  }

}
