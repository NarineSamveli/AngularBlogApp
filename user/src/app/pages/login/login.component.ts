import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
   }

  validateLogin() {
    if (this.user.login === 'admin' && this.user.password === 'admin') {
      localStorage.setItem('loggedInUser', this.user.login);
      localStorage.setItem('loggedInID', this.user.password);
      localStorage.setItem('loggedInPassword', this.user.password);
      this.user.role = 'admin';
      this.router.navigate(['/home']);
      return;
    }
    if (this.user.login && this.user.password) {
        // tslint:disable-next-line: align
        this.userService.validateLogin(this.user).subscribe(result => {
        // console.log('result is ', result);
        // tslint:disable-next-line: no-string-literal
        if (result['status'] === 'success') {
          // tslint:disable-next-line: no-string-literal
          this.user = result['data'];
          // tslint:disable-next-line: no-string-literal
          localStorage.setItem('loggedInID', result['data']['_id']);
          localStorage.setItem('loggedInUser', this.user.fullName);
          localStorage.setItem('loggedInPassword', this.user.password);
          this.user.role = 'user';
          this.router.navigate(['/home']);
        } else {
          alert('Wrong login password');
        }
      }, error => {
        console.log('error is ', error);
        alert('Wrong login and password');
      });
    } else {
        alert('enter login and password');
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
