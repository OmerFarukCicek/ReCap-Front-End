import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CreditCard } from 'src/app/models/creditCard';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: CarDetail[] = [];
  mainCar: CarDetail;
  brands: Brand[] = [];
  colors: Color[] = [];
  customers: Customer[] = [];
  creditCards: CreditCard[] = [];
  rental: Rental = {
    rentalId: 0,
    carId: 0,
    rentDate: "",
    returnDate: "",
    customerId: 0
  };
  creditCard: CreditCard = {
    id: 0,
    customerId: 0,
    cardNo: "",
    name: "",
    expiringDate: "",
    cvv: 0,
  }
  carImages: CarImage[];
  dataLoaded = false;
  carFiltered = false;
  payment = false;
  paymentLoad = false;
  filterText = "";
  filterColorId: number = 0;
  filterBrandId: number = 0;
  paymentNumber: number = 0;

  constructor(private CarService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
        this.carFiltered = true;
      }
      else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
        this.carFiltered = true;
      }
      else if (params["carId"]) {
        this.getDetails(params["carId"]);
        this.carFiltered = true;
      } else {
        this.getCars();
      }
      this.getBrands();
      this.getColors();
      this.getCustomers();
    });
  }

  getCars() {
    this.CarService.getCars()
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      this.dataLoaded = true;
    })
  }

  getCarImageClass(carImage:CarImage){
    if (carImage == this.carImages[0]) {
      return "carousel-item active";
    }
    return "carousel-item";
  }

  getCarsByColor(colorId: number) {
    this.CarService.getCarsByColor(colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  getCarsByBrand(brandId: number) {
    this.CarService.getCarsByBrand(brandId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  getCarsByBrandAndColor(brandId: number, colorId: number) {
    this.CarService.getCarsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }

  getDetails(carId: number) {
    this.CarService.getByCarId(carId)
      .subscribe((response) => {
        this.cars = response.data;
        this.mainCar = this.cars[0];
        this.dataLoaded = true;
      });
    this.CarService.getCarImages(carId)
      .subscribe((response) => {
        this.carImages = response.data;
        this.dataLoaded = true;
      });
  }

  getCarByFilter(brandId: number, colorId: number) {
    if (brandId === 0 && colorId === 0) {

    }
    else if (brandId !== 0 && colorId === 0) {
      this.getCarsByBrand(brandId);
      this.toastrService.success("Listeleme Başarılı", "Başarılı");
    }
    else if (brandId === 0 && colorId !== 0) {
      this.getCarsByColor(colorId);
      this.toastrService.success("Listeleme Başarılı", "Başarılı");
    }
    else {
      this.getCarsByBrandAndColor(brandId, colorId);
      this.toastrService.success("Listeleme Başarılı", "Başarılı");
    }
  }
  
  addRental(rental: Rental) {
    localStorage.setItem("customerId",rental.customerId.toString());
    rental.carId = this.mainCar.carId;
    this.rentalService.addRental(rental).subscribe(
      (response) => {
        this.toastrService.success("Kiralama Başarılı", "Başarılı");
        this.router.navigate([`payment`]);
        console.log(response.success);
        this.payment = true;
      },
      (responseError) => {
        this.toastrService.error("Kiralama Başarısız", "Başarısız");
      }
    );
  }

  totalPrice(date1: string, date2: string) {
    var diff = Math.ceil((Date.parse(date2) - Date.parse(date1)) / 86400000)
    this.paymentNumber = diff * this.mainCar.dailyPrice;
    localStorage.setItem("price",this.paymentNumber.toString());
  }

}