import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';

import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRouters: Routes = [
  {path: '', component: HomeComponent},
  {path: 'add-new-order', component: AddOrdersComponent},
  {path: 'list-orders', component: ListOrdersComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    AddOrdersComponent,
    ListOrdersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MultiSelectAllModule,
    RouterModule.forRoot(appRouters)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
