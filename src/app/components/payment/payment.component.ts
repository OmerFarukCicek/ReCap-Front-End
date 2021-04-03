import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  creditCards: CreditCard[] = [];
  creditCard: CreditCard = {
    id: 0,
    customerId: 0,
    cardNo: "",
    name: "",
    expiringDate: "",
    cvv: 0,
  }
  creditCard2: CreditCard = {
    id: 0,
    customerId: 0,
    cardNo: "",
    name: "",
    expiringDate: "",
    cvv: 0,
  }
  
  IsDisabled:boolean = false;
  paymentNumber: number = 0;

  constructor(    
    private creditCardService: CreditCardService,
    private toastrService: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getCreditCard(parseInt(localStorage.getItem("customerId")));
    this.paymentNumber = parseInt(localStorage.getItem("price"));
  }

  getCreditCard(customerId:number){
    this.creditCardService.getCreditCard(customerId).subscribe(response => {
      this.creditCards = response.data;
    })
  }

  setCreditCard(id:number){
    this.creditCardService.getById(id).subscribe(response =>{
      this.creditCard.cardNo = response.data.cardNo;
      this.creditCard.name = response.data.name;
      this.creditCard.cvv = response.data.cvv;
      this.creditCard.expiringDate = response.data.expiringDate;
      this.IsDisabled = true;
    })
  }

  pay(){
    if(this.creditCard.cardNo == "" || 
    this.creditCard.name == "" || 
    this.creditCard.cvv == 0 || 
    this.creditCard.expiringDate == "")
    {
      this.toastrService.error("Boş Alan Bırakmayınız", "Ödeme Başarısız");
    }
    else{
      this.toastrService.info("Ödeme Gerçekleştiriliyor");
      setTimeout(() => {
        this.toastrService.success("Ödeme Başarılı", "Başarılı");
        localStorage.removeItem("customerId");
        localStorage.removeItem("price");
      }, 5000);
    }
  }

  payAndSave(creditCard: CreditCard) {
    this.creditCardService.addCreditCard(creditCard).subscribe(
      (response) => {
        console.log(response.success);   
        this.toastrService.info("Ödeme Gerçekleştiriliyor");
        setTimeout(() => {
          this.toastrService.success("Ödeme Başarılı", "Başarılı");
          this.toastrService.success("Kayıt Başarılı", "Başarılı");
          localStorage.removeItem("customerId");
          localStorage.removeItem("price");
        }, 5000);
        setTimeout(() => {
          this.router.navigate([``]);
        }, 10000);
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Ödeme Başarısız'
            );
          }
        }
      })
  }

}
