import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId! : string;
  product! : Product;

  productFormGroup! : FormGroup;
  errorMessage: any;
  constructor(private route: ActivatedRoute,
              private  productService: ProductsService,
              private  fb: FormBuilder,
              private router: Router) {
    this.productId= this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (product)=>{
        this.product= product;

        this.productFormGroup= this.fb.group({
          name: this.fb.control(this.product.name,[Validators.required, Validators.minLength(4), Validators.maxLength(225)]),
          price: this.fb.control(this.product.price,[Validators.required, Validators.min(25), Validators.max(225000)]),
          promotion: this.fb.control(this.product.promotion,[Validators.required]),
        });
      },
      error: err=>{
        console.log(err);
      }

    });
  }

  handleEditProduct() {
    let product= this.productFormGroup.value;
    product.id=  this.productId;
    console.log(this.productFormGroup.value);

    this.productService.editProduct(product).subscribe(
      {
        next: (data)=>{
          alert("Product edit success");
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
