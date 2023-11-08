import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  isLoggedIn: boolean = false;
  isRole: string | null = null; // Initialize isRole as a string or null
  
  username = sessionStorage.getItem('username');
  constructor(private router: Router) { }

  ngOnInit(): void {
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
    this.isRole = sessionStorage.getItem('role');


    // if (this.isLoggedIn === true && this.isRole === 'Admin') {
    //   this.router.navigate(['/adminLogin']);
    // }
  }



  
  handleLogout(): void {
    // Handle the logout action here, e.g., clear sessionStorage and navigate to the login page
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('role');
    sessionStorage.clear();
    this.isLoggedIn = false; // Update the logged-in status
    this.router.navigate(['/newhome']);
  }

  
}