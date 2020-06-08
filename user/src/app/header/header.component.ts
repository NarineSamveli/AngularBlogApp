import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('addPost') addBtn: ElementRef;
  constructor(private commonService: CommonService, private router: Router){
    if (!localStorage.getItem('loggedInUser')){
        this.router.navigate(['/']);
    }

    this.commonService.postEdit_Observable.subscribe(res => {
        this.addBtn.nativeElement.click();
    });

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
