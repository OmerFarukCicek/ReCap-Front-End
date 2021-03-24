import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarUserComponent } from './components/car-user/car-user.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/details/:carId", component:CarComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"cars/update", component:CarEditComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"brands/update", component:BrandEditComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"colors/update", component:ColorEditComponent},
  {path:"rentals", component:RentalComponent},
  {path:"carUsers", component:CarUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
