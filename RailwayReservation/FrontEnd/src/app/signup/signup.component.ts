import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../Admin-Services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  addUserErrorMessage: any;
  constructor(private formBuilder: FormBuilder, private signupService:SignupService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,}$/)
        ]
      ],
      role: ['User', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      country: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.signupForm.valid) {
      // Submit the form data
      console.log(this.signupForm.value);
      this.signupService.signupUser(this.signupForm.value).subscribe({
        next:(val:any)=>{
          alert("Data Added Successfully")
          //window.location.reload(); // Reload the page
          this.router.navigate(['/login']); 
        },
        error:(val:any)=>{

          this.addUserErrorMessage=val.error.message;
          window.scrollTo(0,0);
        }
      })
    } else {
      // Handle validation errors
      console.log('Form contains validation errors.');
      alert("Please Provide Valid Data")
    }
  }

  goBack() {
    window.location.reload(); // Reload the page
  }
}
