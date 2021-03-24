import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { BrandResponseModel } from '../models/brandResponseMoel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44303/api/";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<BrandResponseModel>{
    return this.httpClient.get<BrandResponseModel>(this.apiUrl+"brands/getall"); 
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add",brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

}
