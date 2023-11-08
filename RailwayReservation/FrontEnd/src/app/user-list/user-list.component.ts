import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Admin-Services/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'password',
    'role',
    'email',
    'gender',
    'age',
    'country'
  ];

  dataSource: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: console.error
    });
  }

}



