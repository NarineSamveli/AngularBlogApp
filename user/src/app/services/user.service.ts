import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) { }

  public getUser(id: string) {
    return this.http.get(this.url + '/api/user/' + id);
  }

  public updateThisUser(user) {
    return this.http.put(this.url + '/api/user/update', user);
  }

  public getAllUsers() {
    return this.http.get(this.url + '/api/user/all');
  }

  public saveUser(user){
    this.http.post(this.url + '/api/user/signup', user).subscribe((res) => {
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
    return this.http.post(this.url + '/api/user/login' , {
      login : user.login,
      password : user.password
    });
  }

}
