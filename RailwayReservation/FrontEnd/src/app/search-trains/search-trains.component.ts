import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../Admin-Services/train.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-trains',
  templateUrl: './search-trains.component.html',
  styleUrls: ['./search-trains.component.css']
})
export class SearchTrainsComponent implements OnInit {

  search!: FormGroup;
  noTrainsFoundMessage: string = ''; // Initialize it with an empty string

 
  datasource: any[]=[];
  constructor(private trainService:TrainService,
          private router:Router,
          private formbuilder:FormBuilder
    ) { }
 
    ngOnInit():void{
      this.search=this.formbuilder.group({
        trainFrom: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        trainTo: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ]
      });}

      searchTrains()
      {
        this.trainService.findByLocation(this.search.value.trainFrom,this.search.value.trainTo).subscribe
          ({
            next:(val:any)=>{
              this.datasource=val;
              if(this.datasource.length===0)
              {
                  this.noTrainsFoundMessage="No trains were found";
              }
            },
            
            error:console.error,
          });
      }

}
