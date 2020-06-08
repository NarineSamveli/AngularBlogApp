import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from './users-service.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [ UsersServiceService ]
})

export class UsersListComponent implements OnInit {
  public users;
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'password', 'dateOfBirth', 'aboutYou', 'role'];
  dataSource: User[];

  constructor(public usersServiceService: UsersServiceService) { }

  ngOnInit(): void {
    this.usersServiceService.getAllUsers().subscribe((users: User[]) => {
      this.dataSource = users;
    });
  }

}
