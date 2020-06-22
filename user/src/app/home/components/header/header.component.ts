import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../commonService/common.service';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: User;
  filename = '../../../assets/shiba1.jpg';

  @ViewChild('addPost') addBtn: ElementRef;
  constructor(private userService: UserService, private commonService: CommonService, private router: Router){
    this.user = new User();

    this.commonService.postEdit_Observable.subscribe(res => {
        this.addBtn.nativeElement.click();
    });
    if (localStorage.getItem('loggedInID')) {
      this.userService.getUser(localStorage.getItem('loggedInID')).subscribe((user: User) => {
        this.user = user;
        if (this.user.filename !== '') {
          this.filename = this.user.filename;
        }
      });
    } else {
      this.user.fullName = 'Wanderer';
    }
  }

  get isAdmin() {
    return this.user.role === 'admin';
  }

  get isUser() {
    return this.user.role === 'user';
  }

    logout() {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInPassword');
        localStorage.removeItem('loggedInID');
        this.router.navigate(['/']);
    }

}
