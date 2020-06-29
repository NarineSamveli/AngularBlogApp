import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../users/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) { }

  public saveUser(user){
    this.http.post(this.url + '/api/authorization/signup', user).subscribe((res) => {
      if (res){
        this.router.navigate(['/login']);
        alert('Add to DataBase. Now you can log on.');
      } else {
        alert('User already exist');
        this.router.navigateByUrl('/register');
      }
    });
  }

  validateLogin(user: User){
    return this.http.post(this.url + '/api/authorization/login' , {
      login : user.login,
      password : user.password
    });
  }

}
