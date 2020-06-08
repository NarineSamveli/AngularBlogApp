import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShowAllPostsService } from '../show-all-posts/show-all-posts.service';
import { Post } from '../models/post.model';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public post_to_delete;
  public posts: any [];

  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private showPostService: ShowAllPostsService, private commonService: CommonService) { }

  ngOnInit(): void {

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
    console.log('post is ', post);
  }

  showPost(post: Post){
    this.commonService.setPostToEdit(post);
    console.log('post is ', post);
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
