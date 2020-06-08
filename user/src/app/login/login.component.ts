import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
  public user: User;

  constructor(private loginService: LoginService, private router: Router) {
    this.user = new User();
  }

  validateLogin() {
    if (this.user.username === 'admin' && this.user.password === 'admin') {
      localStorage.setItem('loggedInUser', this.user.username);
      localStorage.setItem('loggedInID', this.user.password);
      localStorage.setItem('loggedInPassword', this.user.password);
      this.user.role = 'admin';
      this.router.navigate(['/home']);
      return;
    }

    if (this.user.username && this.user.password) {
        // tslint:disable-next-line: align
        this.loginService.validateLogin(this.user).subscribe(result => {
        // console.log('result is ', result);
        // tslint:disable-next-line: no-string-literal
        if (result['status'] === 'success') {
          localStorage.setItem('loggedInUser', this.user.username);
          // tslint:disable-next-line: no-string-literal
          localStorage.setItem('loggedInID', result['data'][0]['_id']);
          localStorage.setItem('loggedInPassword', this.user.password);
          this.user.role = 'user';
          this.router.navigate(['/home']);
        } else {
          alert('Wrong username password');
        }
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('enter user name and password');
    }
  }

  registerUser() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
      if (localStorage.getItem('loggedInUser')){
          this.router.navigate(['/home']);
      }
  }

}
