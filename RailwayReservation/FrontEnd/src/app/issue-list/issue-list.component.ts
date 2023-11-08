import { Component, OnInit } from '@angular/core';
import { IssueService } from '../Admin-Services/issue.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  issue:string| null=null;
  issueId:string| null=null;
  isLoggedIn:boolean=false;
  formValue!: FormGroup;
  isRole: string | null = null;
  data: any;
  
  displayedColumns: string[] = [
    'username',
    'issue',
    'status',
    'solution',
  ];

  dataSource: any[] = [];
  router: any;

constructor(
  private issueServie: IssueService,
  private formBuilder: FormBuilder
){}

ngOnInit(): void {
  const loggedInValue = sessionStorage.getItem('loggedIn');
  this.isLoggedIn = loggedInValue === 'true';
  this.getIssueList();
  this.isRole = sessionStorage.getItem('role');
  this.getIssueList();
  //this.issue=sessionStorage.getItem('issue');
  this.issue=sessionStorage.getItem('issue');
  this.issueId=sessionStorage.getItem('issueId');

  this.formValue = this.formBuilder.group({
    issueId:[this.issueId],
    issue: [this.issue],
    status: [''], 
    solution:[''],
  });
}

getIssueList(){
  if(this.isRole === 'Admin'){
  this.issueServie.getAllIssues().subscribe({
    next: (res) => {
      this.dataSource = res;
      console.log(this.dataSource+"******************************************")
    },
    error: console.error,
  });
}

else if(this.isRole === 'User'){
  this.issueServie.getUserissue().subscribe({
     next: (res) => {
        this.dataSource = res;
        console.log(res)
      },
      error: console.error,
  });
}
}

details(username: any){
  this.issueServie.getIssuesByUserName(username).subscribe({
    next: (res) => {
      this.data=res;
      // console.log("***************************************************")
      console.log(res)
    },
    error: console.error,
  });
}

EditForm(data: any){

  // this.formValue.controls['username'].setValue(data.username);

  this.formValue.controls['issue'].setValue(data.issue);

  this.formValue.controls['status'].setValue(data.status);

  this.formValue.controls['solution'].setValue(data.solution);

  sessionStorage.setItem('issue',this.formValue.value.issue);
  this.formValue.controls['issueId'].setValue(data.issueId);
  sessionStorage.setItem('issueId',this.formValue.value.issueId);

  }

  updateIsssue()
  {
    if(this.isLoggedIn){
    if(this.isRole === 'Admin'){
    this.issueServie.updateIssue(this.formValue.value,this.formValue.value.issueId).subscribe(

      {
        next:(res)=>

        {
          this.dataSource=res;
          console.log(res);
        },

      }

    )

    }

  }

  }

  goBack() {
    window.location.reload(); // Reload the page
  }

}
