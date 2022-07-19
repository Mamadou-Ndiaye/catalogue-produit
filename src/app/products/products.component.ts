import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {Product} from "../model/product";
import { AuthenticationService } from '../services/authentication.service';
import {ProductsService} from "../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! : Array<Product>;
  errorMessage! : string;

  searchFormGroup! : FormGroup;

  constructor(private productService: ProductsService,
              private  fb: FormBuilder,
              public authenticationService: AuthenticationService,
              private  router: Router) { }

  ngOnInit(): void {
    this.searchFormGroup= this.fb.group({
      keyword: this.fb.control(null)
    });
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      {
        next: (data)=>{
          this.products = data;
        },
        error: err => {
          this.errorMessage= err;
        }
      }
    )
  }

  handleDeleteProduct(p: Product) {
     let conf = confirm("Are you Sure?");
     if (conf== false) return;
      this.productService.deleteProduct(p.id).subscribe(
        {
          next: (data)=>{
              let index = this.products.indexOf(p);
              this.products.splice(index,1);
          },
          error: err => {
            this.errorMessage= err;
          }
        }
      )
  }

  handleSetPromo(p: Product) {
    let promo= p.promotion;
    console.log('promotion is {}',promo);
       this.productService.setPromotion(p.id).subscribe({
         next: (data)=>{
           console.log("OK");
           p.promotion=! promo;
         },
         error: (err)=>{
           this.errorMessage= err;
         }
       })
  }

  handleSearchProduct() {
    let  keyword = this.searchFormGroup.value.keyword;
    this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe(
      {
        next: (data)=>{
          this.products= data;
        },
        error: (err)=>{
          this.errorMessage= "Product not found";
        }
      }
    )
  }

  handleNewProduct() {
     this.router.navigateByUrl("/admin/new-product");
  }

  handleEditProduct(p: Product) {
    this.router.navigate(["/admin/edit-product/"+p.id]);

  }
}
