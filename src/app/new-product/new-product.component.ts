import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroup!: FormGroup;
 errorMessage! : string;
  constructor(private  fb: FormBuilder,
              private  productService: ProductsService,
              private  router: Router) { }

  ngOnInit(): void {
    this.productFormGroup= this.fb.group({
      //id: this.fb.control(null,[Validators.required, Validators.minLength(0), Validators.maxLength(225)]),
      name: this.fb.control(null,[Validators.required, Validators.minLength(4), Validators.maxLength(225)]),
      price: this.fb.control(null,[Validators.required, Validators.min(25), Validators.max(225000)]),
      promotion: this.fb.control(false,[Validators.required]),
    });
  }

  handleAddProduct() {

    //let id= this.productFormGroup.value.id;
    let product= this.productFormGroup.value;
    console.log(this.productFormGroup.value);

   this.productService.addNewProduct(product).subscribe(
     {
       next: (data)=>{
          alert("Product add success");
          this.productFormGroup.reset();
          this.router.navigateByUrl("/admin/products");
       },
       error: (err)=>{
            this.errorMessage= err;
            console.log(err);
       }
     }
   );

  }
}
