import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44303/api/auth";

  constructor(private httpclient:HttpClient) { }

  login(loginModel:LoginModel)  {
    return this.httpclient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/login",loginModel);
  }

  register(registerModel:RegisterModel)  {
    return this.httpclient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"/register",registerModel);
  }

  isAuthanticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

}
