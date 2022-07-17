import { NgModule } from '@angular/core';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminTemplateComponent , canActivate: [AuthenticationGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'customers', component: CustomersComponent }
    ]},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }