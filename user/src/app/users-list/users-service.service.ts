import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  public getAllUsers() {
    return this.http.get(this.url + '/api/user/all');
  }
}
