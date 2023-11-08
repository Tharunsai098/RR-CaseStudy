import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../Admin-Services/payment.service';


@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent {
   
  isLoggedIn:boolean=false;
  isRole: string | null = null;
  dataSource:any[]=[];

  constructor(

    private paymentService: PaymentService,

    private router: Router,

  ) {}

  ngOnInit(): void {
 
  const loggedInValue = sessionStorage.getItem('loggedIn');
  this.isLoggedIn = loggedInValue === 'true';
  this.isRole = sessionStorage.getItem('role');
    this.getAllPayments();

  }

  getAllPayments()

  {
    if(this.isLoggedIn){
      if(this.isRole === 'Admin'){
    
    this.paymentService.getPaymentList().subscribe({

      next:(res)=>{

        this.dataSource=res;

      },
      error:console.error,

    });
  }
}

  }

}
