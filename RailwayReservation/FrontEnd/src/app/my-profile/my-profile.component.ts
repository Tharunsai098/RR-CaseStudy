import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../Admin-Services/profile.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  updateForm!:FormGroup;

  username=sessionStorage.getItem('username');
  role=sessionStorage.getItem('role');

  datasource: any[]=[];

  data:any;

  constructor(private profileService:ProfileService,

          private router:Router,

          private formBuilder:FormBuilder,
          

    ) { }

 
  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({

      username:[this.username],

      role:[this.role],

      email: ['', [Validators.required, Validators.email]],

      gender: ['', Validators.required],

      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],

      country: ['', Validators.required]

    });
    this.newmethod();

  }

  submitForm()

  {

    if (this.updateForm.valid) {

      this.profileService.updateProfile(this.updateForm.value,).subscribe({

        next:()=>

        {

          // alert("Data Updated Successfully");
          Swal.fire({
            title: 'Data Updated Successfully',
            icon: 'success',
          });
          
        },

      })
      this.router.navigate(['/home']);
    }

    else{

      console.log('Form contains validation errors.');

      // alert("Please Provide Valid Data")
      Swal.fire({
        title: 'Please Provide Valid Data',
        icon: 'warning',
      });

    }

  }

  goBack()
  {
    window.location.reload();
  }

 

  newmethod()
  {

    this.profileService.showuserdetails(this.username).subscribe({

      next:(res:any)=>

      {

        this.data=res;

        console.log(res);

        this.updateForm.patchValue({

          email: res.email,

          age: res.age,

          gender:res.gender,

          country:res.country

        });

      }

    })
  }



}