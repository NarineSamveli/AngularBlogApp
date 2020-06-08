import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  validateLogin(user: User){
    return this.http.post(this.url + '/api/user/login', {
      username : user.username,
      password : user.password
    });
  }

}

