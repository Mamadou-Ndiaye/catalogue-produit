import { Injectable } from '@angular/core';
import {Product} from "../model/product";
import {Observable, of, throwError} from "rxjs";
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  products! : Array<Product>;
  constructor() {
    this.products= [

      {id: UUID.UUID(), name: "Computer", price: 700000, promotion: true},
      {id: UUID.UUID(), name: "SmartPhone", price: 350000, promotion: true},
      {id: UUID.UUID(), name: "Printer", price: 100000, promotion: false},
      {id: UUID.UUID(), name: "Tablette", price: 30000, promotion: true},
      {id: UUID.UUID(), name: "Bluetoth", price: 6000, promotion: false},
    ]
  }


  getAllProducts() : Observable<Array<Product>>{
    let random = Math.random();
    if (random < 0.1)  return  throwError(()=>new Error("Internet connexion error"));
    return of([...this.products]);
  }

  deleteProduct(id: string): Observable<boolean>{
    this.products= this.products.filter(p=>p.id!=id);
    return of(true);
  }


  setPromotion(id: string): Observable<boolean>{
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

  getProduct(id: string): Observable<Product>{
    let product= this.products.find(p=>p.id== id);
    if(product == undefined) return  throwError(()=> new Error("Product not found"));
    return of(product);
  }

  addNewProduct(product: Product): Observable<Product>{
    product.id= UUID.UUID();
    this.products.push(product);
    return of(product);

  }

  editProduct(product: Product) : Observable<Product> {
    this.products= this.products.map(p=>(p.id==product.id)?product:p);
    return of(product);
  }


  public deleteListProducts(products : Product[]):Observable<boolean>{
    this.products=this.products.filter(prod=> products.find(p=>p.id==prod.id)==null);
    return of(true);
  }


}
