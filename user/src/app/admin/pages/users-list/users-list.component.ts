import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/models/user.model';
import { CommonService } from '../../../core/commonService/common.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
  public users;
  displayedColumns: string[] = ['fullName', 'login', 'email', 'password', 'dateOfBirth', 'aboutYou', 'role', 'isDeleted'];
  dataSource: User[];

  constructor(public userService: UserService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      // tslint:disable-next-line: no-string-literal
      this.dataSource = users['data'];
    });
  }

  transferUser(id){
    this.commonService.DoShareUser(id);
  }

}
