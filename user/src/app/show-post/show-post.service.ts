import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ShowPostService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAllPost(){
    return this.http.post(this.url + '/api/post/getAllPost', {});
  }

  deletePost(id){
    return this.http.post(this.url + '/api/post/deletePost', {id})
  }

}
