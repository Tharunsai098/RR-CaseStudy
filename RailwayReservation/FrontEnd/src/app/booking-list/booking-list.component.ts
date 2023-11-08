import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Admin-Services/booking.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit{
  isRole: string | null = null;

  displayedColumns: string[] = [
    'pnr',
    'username',
    'trainNo',
    'phnnumber',
    'email',
    'numberOfTickets',
    'Cost',
    'action',
  ];

  dataSource: any[] = [];

  data: any;

  constructor(
    private bookingService: BookingService,
  ){}

  ngOnInit(): void {
    this.getBookingList();
    this.isRole = sessionStorage.getItem('role');
    this.getBookingList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource = this.dataSource.filter((row) => {
      return (
        row.trainNo.toLowerCase().includes(filterValue) ||
        row.username.toLowerCase().includes(filterValue) ||
        row.phnnumber.toLowerCase().includes(filterValue) ||
        row.numberOfTickets.toLowerCase().includes(filterValue)
      );
    });

    if (!filterValue || filterValue === '') {
      this.getBookingList();
    }
  }

  getBookingList() {
    if(this.isRole === 'Admin'){
    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        this.dataSource = res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }
  else if(this.isRole === 'User'){
    this.bookingService.viewByUserName().subscribe({
      next: (res) => {
        this.dataSource = res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }
  }

  cancelTicket(pnr: any) {
    if(confirm("Are you sure to delete ")){
    console.log('Deleting train with trainNo: ', pnr);
   
    this.bookingService.cancelTicket(pnr).subscribe({
      next: (res) => {
        console.log(res);
      },
      
    });
  
    alert('Ticket with pnr cancelled successfully ' + pnr);
    this.getBookingList();
  }
}
  

  details(pnr: any){
    this.bookingService.getDetails(pnr).subscribe({
      next: (res) => {
        this.data=res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }
}
