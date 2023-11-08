import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../Admin-Services/train.service';

@Component({
  selector: 'app-train-form',
  templateUrl: './train-form.component.html',
  styleUrls: ['./train-form.component.css']
})
export class TrainFormComponent {
  trainForm: FormGroup;
  // addTrainErrorMessage: any;

  constructor(private fb: FormBuilder, private trainservice:TrainService) {
    this.trainForm = this.fb.group({
      trainNo: ['', [Validators.required, Validators.pattern('\\d{5}')]],
      trainName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      trainFrom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      trainTo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      fare: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      seats: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      time: ['', [Validators.required]]
    });
  }

  
  submitForm() {
    if (this.trainForm.valid) {
      // Submit the form data
      console.log(this.trainForm.value);
      this.trainservice.addTrain(this.trainForm.value).subscribe({
        next:(val:any)=>{
          console.log(val)
         
         }
        // error:(val:any)=>{
        //   this.addTrainErrorMessage=val.error.message;
        //   window.scrollTo(0,0);
        //}
      })
      
      console.log(this.trainForm.value)
      alert("Data Added Successfully")
      // window.location.reload();


    } else {
      // Handle validation errors
      alert('Please Enter Valid Data')
      console.log('Form contains validation errors.');
    }
  }

  goBack() {
     // Reload the page
  }
  reload(){
    window.location.reload();
  }
}

