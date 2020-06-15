import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  public users;
  displayedColumns: string[] = ['fullName', 'login', 'email', 'password', 'dateOfBirth', 'aboutYou', 'role'];
  dataSource: User[];

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.dataSource = users;
    });
  }

  transferUser(id){
    console.log(id)
  }

}
