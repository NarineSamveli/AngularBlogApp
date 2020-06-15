import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAllPost(){
    return this.http.get(this.url + '/api/post/getAllPost');
  }

  getAllUserPost(id){
    return this.http.get(this.url + '/api/post/getAllUserPost/' + id);
  }

  deletePost(id){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { id }
    };

    return this.http.delete(this.url + '/api/post/deletePost', options);
  }

  addPost(post: Post){
    return this.http.post(this.url + '/api/post/createPost', {
      title : post.title,
      description : post.description,
      author : localStorage.getItem('loggedInUser'),
      authorId: localStorage.getItem('loggedInID'),
      date : new Date(),
      likes : 0,
      comment : '',
      image : post.image
    });
  }

  updatePost(post: Post){
    return this.http.put(this.url + '/api/post/updatePost', post);
  }

}
