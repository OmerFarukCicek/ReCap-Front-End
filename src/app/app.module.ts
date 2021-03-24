import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarUserComponent } from './components/car-user/car-user.component';
import { CarFilterPipe } from './components/pipes/car-filter.pipe';
import { BrandFilterPipe } from './components/pipes/brand-filter.pipe';
import { ColorFilterPipe } from './components/pipes/color-filter.pipe';

import {ToastrModule} from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { ColorEditComponent } from './components/color-edit/color-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    RentalComponent,
    CarUserComponent,
    CarFilterPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    BrandEditComponent,
    CarEditComponent,
    ColorEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,   
    ReactiveFormsModule, 
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
