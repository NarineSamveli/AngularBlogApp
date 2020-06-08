import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalServiceService } from './personal-service.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss'],
  providers: [ PersonalServiceService ]
})
export class PersonalPageComponent implements OnInit {
  public user: User;

  constructor(private personalService: PersonalServiceService, private router: Router){
    if (!localStorage.getItem('loggedInUser')){
        this.router.navigate(['/']);
    }
    this.personalService.getUser(localStorage.getItem('loggedInID')).subscribe((user: User) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.personalService.getUser(localStorage.getItem('loggedInID')).subscribe((user: User) => {
      this.user = user;
    });
  }

  cancelAll() {
    this.router.navigate(['/home']);
  }

}
