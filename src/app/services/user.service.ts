import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44303/api/";

  constructor(private httpClient:HttpClient) { }


  getUsersByEmail(email:string){
    let newPath = this.apiUrl + "users/getuserbyemail?email=" + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(registerModel:RegisterModel)  {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"users/update",registerModel);
  }

}
