import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ColorResponseModel } from '../models/colorResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  
  apiUrl = "https://localhost:44303/api/";
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ColorResponseModel>{
    return this.httpClient.get<ColorResponseModel>(this.apiUrl+"colors/getall"); 
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add",color);
  }

  update(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

}
