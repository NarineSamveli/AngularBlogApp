import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

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
    if (!localStorage.getItem('loggedInUser')){
        this.router.navigate(['/']);
    }

    this.commonService.postEdit_Observable.subscribe(res => {
        this.addBtn.nativeElement.click();
    });
    // this.user = localStorage.getItem('loggedInUser');

    if (localStorage.getItem('loggedInUser') !== 'admin') {
      this.userService.getUser(localStorage.getItem('loggedInID')).subscribe((user: User) => {
        this.user = user;
        if (this.user.filename !== '') {
          this.filename = this.user.filename;
        }
      });
    } else {
      this.user.fullName = 'Mr. Admin';
    }
  }

  get isAdmin() {
    return localStorage.getItem('loggedInUser') === 'admin';
  }

    logout() {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInPassword');
        localStorage.removeItem('loggedInID');
        this.router.navigate(['/']);
    }

}
