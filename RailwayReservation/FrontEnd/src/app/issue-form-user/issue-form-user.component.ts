import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService } from '../Admin-Services/issue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-form-user',
  templateUrl: './issue-form-user.component.html',
  styleUrls: ['./issue-form-user.component.css'],
})
export class IssueFormUserComponent implements OnInit {
  issueForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private router:Router
    ) {}

  ngOnInit() {
    this.issueForm = this.formBuilder.group({
      issue: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(250)]],
      status: ['New'], // Auto-populated with "New"
    });
  }

  submitForm() {
    if (this.issueForm.valid) {
      // Submit the form data
      console.log(this.issueForm.value);
      this.issueService.addissue(this.issueForm.value).subscribe({
        next:(val:any)=>{
          console.log(val)
        }
      })
      console.log(this.issueForm.value)
      alert("Issue Added Successfully")
      //window.location.reload();
      this.router.navigate(['/issueList']);
    } else {
      // Handle validation errors
      alert("Please Enter the Data")
      console.log('Form contains validation errors.');
    }
  }

  goBack() {
    window.location.reload(); // Reload the page
  }
}
