import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  IsSignedBool = false;
  user:User = {
    email:"",
    firstName:"",
    lastName:"",
  };
  constructor(private authService:AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.IsSigned();
    this.GetUserByEmail(localStorage.getItem("email"));
  }

  IsSigned(){
    if(this.authService.isAuthanticated()){
      this.IsSignedBool = true;
    }else{
      this.IsSignedBool = false;
    }
  }

  GetUserByEmail(email:string){
    this.userService.getUsersByEmail(email).subscribe((response) => {
      this.user = response.data;
    })
  }

  LogOut(){
    localStorage.clear();
    window.location.reload();
  }
}
