import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowPostService } from './show-post.service';
import { Post } from '../models/post.model';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.scss'],
  providers: [ ShowPostService ]
})
export class ShowPostComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public post_to_delete;
  public posts: any [];

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private showPostService: ShowPostService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getAllPost();

    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
    });
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
  }

  showPost(post: Post){
    this.commonService.setPostToShow(post);
    // console.log('post is ', post);
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
