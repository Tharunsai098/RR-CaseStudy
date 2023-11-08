import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../Admin-Services/signin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})

export class SigninComponent {
  signinUser: FormGroup;
  public showPassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private signinFrom: SigninService,
    private router: Router
  ) {
    this.signinUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.signinUser.valid) {
      // Submit the form data
      this.signinFrom.signinUser(this.signinUser.value).subscribe({
        next: (val: any) => {
          Swal.fire({
            title: 'Login succcessfully',
            
            icon: 'success',
          });
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('role', val.roles[0]); // Access the roles array
          sessionStorage.setItem('token', val.accessToken);
          sessionStorage.setItem('username',val.username);
          // Redirect to a specific route after successful login if needed
          this.router.navigate(['/home']);
         // this.router.navigate(['/navbar']);
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire({
            title: 'Login Failed',
            icon: 'error',
          });
        },
      });
    } else {
      // Handle validation errors
      // alert('Please Enter Valid Data');
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
