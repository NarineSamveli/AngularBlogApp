import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../../posts/services/post.service';
import { Post } from '../../../posts/models/post.model';
import { CommonService } from '../../../commonService/common.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss']
})

export class ShowPostComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public post_to_delete;
  public posts: any [];

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private postService: PostService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.posts = [];
    this.getAllUserPost();

    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllUserPost();
    });
  }

  getAllUserPost(){
    this.postService.getAllUserPost(localStorage.getItem('loggedInID') ).subscribe(result => {
      // tslint:disable-next-line: no-string-literal
      this.posts = result['data'];
    });
  }

  editPost(post: Post){
    this.commonService.setPostToEdit(post);
  }

  showPost(post: Post){
    this.commonService.setPostToShow(post);
  }

  setDelete(post: Post){
    // tslint:disable-next-line: no-string-literal
    this.post_to_delete = post['_id'];
    localStorage.setItem('PostToDelete', this.post_to_delete);
  }

  // unsetDelete(){
  //   this.post_to_delete = null;
  //   localStorage.setItem('PostToDelete', null);
  // }

  // deletePost(){
  //   console.log("deeel - " + this.post_to_delete.id)
  //   this.postService.deletePost(this.post_to_delete.id).subscribe(res => {
  //     this.getAllPost();
  //     this.closeBtn.nativeElement.click();
  //   });
  // }


}
