import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { User } from 'src/app/models/user';
import { UserUpdateModel } from 'src/app/models/userUpdateModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user:User = {
    email:"",
    firstName:"",
    lastName:"",
  };
  userCheckModel:LoginModel = {
    email:"",
    password:""
  };
  userToUpdate:UserUpdateModel = {
    email:"",
    firstName:"",
    lastName:"",
    password:"",
    oldEmail:""
  };
  IsTrue:boolean=false;
  constructor(
    private toastrService: ToastrService,
    private authService:AuthService, 
    private userService:UserService) { }

  ngOnInit(): void {
    this.GetUserByEmail(localStorage.getItem("email"));
  }

  GetUserByEmail(email:string){
    this.userService.getUsersByEmail(email).subscribe((response) => {
      this.user = response.data;
    })
  }

  CheckUser(){
    this.userCheckModel.email = localStorage.getItem("email");
    this.authService.login(this.userCheckModel).subscribe((response)=>{
      this.userToUpdate.email = this.user.email;
      this.userToUpdate.oldEmail = localStorage.getItem("email");
      this.userToUpdate.firstName = this.user.firstName;
      this.userToUpdate.lastName = this.user.lastName;
      localStorage.setItem("email",this.userToUpdate.email)
  
      this.userService.update(this.userToUpdate)
        .subscribe((response) => {
          this.toastrService.success("Kullanıcı Güncellendi","Başarılı");
        });
    },((responseError)=>{
      this.toastrService.error("Kullanıcı Güncellenemedi","Başarısız");
    }))
  }

  }

