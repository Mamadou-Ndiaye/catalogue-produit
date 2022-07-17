import { Injectable } from '@angular/core';
import {Product} from "../model/product";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products! : Array<Product>;
  constructor() {
    this.products= [

      {id:1, name: "Computer", price: 700000, promotion: true},
      {id:2, name: "SmartPhone", price: 350000, promotion: true},
      {id:3, name: "Printer", price: 100000, promotion: false},
      {id:4, name: "Tablette", price: 30000, promotion: true},
      {id:5, name: "Bluetoth", price: 6000, promotion: false},
    ]
  }


  getAllProducts() : Observable<Array<Product>>{
    let random = Math.random();
    if (random < 0.1)  return  throwError(()=>new Error("Internet connexion error"));
    return of([...this.products]);
  }

  deleteProduct(id: number): Observable<boolean>{
    this.products= this.products.filter(p=>p.id!=id);
    return of(true);
  }


  setPromotion(id: number): Observable<boolean>{
    let product= this.products.find(p=>p.id ==id);
    if(product != undefined){
      product.promotion=! product.promotion;
      return  of(true);
    }
    else
     return throwError( ()=> new Error("Product not found"));
  }

  searchProducts(keyword: string): Observable<Product[]>{
    let products= this.products.filter(p=>p.name.includes(keyword));
    return of(products);
  }


}
