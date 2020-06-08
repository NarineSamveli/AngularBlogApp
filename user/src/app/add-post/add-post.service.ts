import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  addPost(post: Post){
    return this.http.post(this.url + '/api/post/createPost', {
      title : post.title,
      description : post.description
    });
  }

  updatePost(post: Post){
    return this.http.post(this.url + '/api/post/updatePost', {
      id: post._id,
      title : post.title,
      description : post.description
    });
  }

}
