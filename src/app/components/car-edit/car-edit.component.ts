import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  mainCar: Car;
  mainCarDetail: CarDetail;
  cars: CarDetail[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];

  dataLoaded = false;
  filterText = "";

  constructor(
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetails(params["carId"]);
        this.getCar(params["carId"]);
      }
      else {
        this.getCars();
      }
    });
    this.getBrands();
    this.getColors();
  }

  getCars() {
    this.carService.getCars()
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }

  getCarDetails(carId: number) {
    this.carService.getByCarId(carId)
      .subscribe((response) => {
        this.cars[0] = response.data[0];
        this.dataLoaded = true;
      });
  }

  getCar(carId: number) {
    this.carService.getCarById(carId)
      .subscribe((response) => {
        this.mainCar = response.data[0];
        this.dataLoaded = true;
      });
  }

  update(car: Car) {
    this.carService.update(car)
      .subscribe((response) => {
        this.toastrService.success(response.message,"Başarılı");
      });
  }
}
