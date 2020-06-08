import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // tslint:disable-next-line: variable-name
  public postAdded_Observable = new Subject();
    // tslint:disable-next-line: variable-name
  public postEdit_Observable = new Subject();
  // tslint:disable-next-line: variable-name
  public postShow_Observable = new Subject();
  // tslint:disable-next-line: variable-name
  public post_to_be_edited;
  // tslint:disable-next-line: variable-name
  public post_to_be_showed;

  constructor(){
    this.post_to_be_edited = new Post();
  }

  notifyPostEdit(){
    this.postEdit_Observable.next();
  }

  notifyPostShow(){
    this.postShow_Observable.next();
  }

  setPostToEdit(post: Post){
    this.post_to_be_edited = post;
    this.notifyPostEdit();
  }

  setPostToShow(post: Post){
    this.post_to_be_showed = post;
    this.notifyPostShow();
  }

  notifyPostAddition(){
    this.postAdded_Observable.next();
  }

}
