import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowAllPostsService } from './show-all-posts.service';
import { Post } from '../models/post.model';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-show-all-posts',
  templateUrl: './show-all-posts.component.html',
  styleUrls: ['./show-all-posts.component.scss'],
  providers: [ShowAllPostsService]
})
export class ShowAllPostsComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public post_to_delete;
  public posts: any [];

  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private showPostService: ShowAllPostsService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getAllPost();

    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
      this.closeBtn.nativeElement.click();
    });

  }

  get isAdmin() {
    return localStorage.getItem('loggedInUser') === 'admin';
  }

  getAllPost(){
    this.showPostService.getAllPost().subscribe(result => {
      // console.log('result is ', result);
      // tslint:disable-next-line: no-string-literal
      this.posts = result['data'];
    });
  }

  editPost(post: Post){
    this.commonService.setPostToEdit(post);
    // console.log('post is ', post);
  }

  showPost(post: Post){
    this.commonService.setPostToShow(post);
  }

  setDelete(post: Post){
    this.post_to_delete = post;
  }

  unsetDelete(){
    this.post_to_delete = null;
  }

  deletePost(){
    this.showPostService.deletePost(this.post_to_delete._id).subscribe(res => {
      this.getAllPost();
      this.closeBtn.nativeElement.click();
    });
  }


}
