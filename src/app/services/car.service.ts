import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://localhost:44303/api/';

  constructor(private httpClient: HttpClient) {}

  getCars():Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getdetails";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getdetailsbycolor?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getdetailsbybrand?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrandAndColor(brandId:number, colorId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getdetailsbycolorandbrand?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getByCarId(carId:number):Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarImages(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car);
  }

}