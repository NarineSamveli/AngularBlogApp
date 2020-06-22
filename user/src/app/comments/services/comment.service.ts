import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getAllComments(id){
    return this.http.get(this.url + '/api/comment/getAllComments/' + id);
  }

  addComment(data){
    return this.http.post(this.url + '/api/comment/addComment', data);
  }

  updateComment(comment){
    return this.http.put(this.url + '/api/comment/updateComment', comment);
  }

  deleteComment(id){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { id }
    };
    return this.http.delete(this.url + '/api/comment/deleteComment', options);
  }

}
