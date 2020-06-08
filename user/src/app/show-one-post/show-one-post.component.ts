import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../models/post.model';
import { ShowOnePostService } from './show-one-post.service';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-show-one-post',
  templateUrl: './show-one-post.component.html',
  styleUrls: ['./show-one-post.component.scss'],
  providers: [ ShowOnePostService ]
})
export class ShowOnePostComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post: Post;
  panelOpenState = false;

  constructor(private showPostService: ShowOnePostService, private router: Router, private commonService: CommonService) {
      if (!localStorage.getItem('loggedInUser')){
          this.router.navigate(['/']);
      }
      this.post = new Post();
   }

  ngOnInit(): void {
    this.commonService.postEdit_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_edited;
      // console.log('post is ', this.post._id);
    });
    this.commonService.postShow_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_showed;
      // console.log('post is ', this.post._id);
    });
  }

  addPost() {
    if (this.post.title && this.post.description){
      if (this.post._id){
        this.showPostService.updatePost(this.post).subscribe(res =>{
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      } else {
        this.showPostService.addPost(this.post).subscribe(res =>{
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      }
    } else {
        alert('Title and Description required');
    }
  }

}
