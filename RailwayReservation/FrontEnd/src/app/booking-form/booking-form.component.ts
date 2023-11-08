
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../Admin-Services/booking.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {}

  // Define variables for Train Number, Fare, and Total Cost
  trainNo = sessionStorage.getItem('trainNo');
  Fare: any = sessionStorage.getItem('Fare');
  numberOfTickets: number = 1; // Initialize with 1 ticket

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      trainNo: [this.trainNo, [Validators.required]],
      Fare: [this.Fare],
      phnnumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      email: ['', [Validators.required, Validators.email]],
      numberOfTickets: [1, [Validators.required, Validators.min(1), Validators.max(6)]],
    });
  }

  submitForm() {
    if (this.bookingForm.valid) {
     

      this.bookingService.bookTicket(this.bookingForm.value).subscribe({
               next:(val:any)=>{
                console.log(val);
               }
              })
              // alert("Data Added Successfully")
              Swal.fire({
                title: 'Data Added succcessfully',
                icon: 'success',
              });
              console.log(this.bookingForm.value);
     
      // Calculate the total cost based on the number of tickets and fare
      const totalCost = this.Fare * (this.bookingForm.get('numberOfTickets')?.value || 1);
      // Store the total cost in sessionStorage
      sessionStorage.setItem('totalCost', totalCost.toString());
      sessionStorage.setItem('email',this.bookingForm.get('email')?.value);
     
      // Redirect to the Razorpay page with total cost and username as query parameters
      this.router.navigate(['/pay'], {
        queryParams: {
          totalCost: totalCost,
         // username: this.bookingForm.get('username')?.value,
        },
      });
    } else {
      // Form contains validation errors
      // alert('Please Enter the Data');
      Swal.fire({
        title: 'Please Enter Valid Data',
        icon: 'warning',
      });
      console.log('Form contains validation errors.');
    }
  }

  goBack() {
    window.location.reload(); // Reload the page
  }
}
