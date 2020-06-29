import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
