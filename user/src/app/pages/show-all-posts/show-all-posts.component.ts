import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-show-all-posts',
  templateUrl: './show-all-posts.component.html',
  styleUrls: ['./show-all-posts.component.scss']
})
export class ShowAllPostsComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public post_to_delete;
  public posts: any [];

  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private postService: PostService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.postService.getAllPost().subscribe(result => {
      this.posts = result['data'];
      // console.log(this.posts);
    });
    
    this.commonService.postAdded_Observable.subscribe(res => {
      this.postService.getAllPost().subscribe(result => {
        this.posts = result['data'];
      });
      // this.closeBtn.nativeElement.click();
    });

  }

  get isAdmin() {
    return localStorage.getItem('loggedInUser') === 'admin';
  }


  editPost(post: Post){
    this.commonService.setPostToEdit(post);
    // console.log('post is ', post);
  }

  showPost(post: Post){
    this.commonService.setPostToShow(post);
  }

  setDelete(post: Post){
    this.post_to_delete = post['_id'];
    localStorage.setItem('PostToDelete', this.post_to_delete);
  }

  likePost(post, i){
    this.commonService.setPostToShow(post);

    const whoLiked = localStorage.getItem('loggedInUser');
    if (whoLiked === 'admin') {
      // tslint:disable-next-line: max-line-length
      const changeClass: HTMLElement = document.getElementsByClassName('likes')[i].getElementsByClassName('likesCount')[0] as HTMLElement;
      changeClass.setAttribute('disabled', 'true') ;
      changeClass.style.cursor = 'not-allowed';
    } else {
      if (post.whoLiked === undefined) {
        post.whoLiked = whoLiked;
        post.likes = +post.likes + 1;
      } else {
        if (post.whoLiked.indexOf(whoLiked) >= 0) {
          // tslint:disable-next-line: max-line-length
          const changeClass: HTMLElement = document.getElementsByClassName('likes')[i].getElementsByClassName('likesCount')[0] as HTMLElement;
          changeClass.setAttribute('disabled', 'true') ;
          changeClass.style.cursor = 'not-allowed';
        } else {
          post.whoLiked = post.whoLiked + '\n' + whoLiked;
          post.likes = +post.likes + 1;
        }
      }
    }
    this.postService.updatePost(post).subscribe(res => {
      //this.commonService.notifyPostAddition();
    });

  }

  // unsetDelete(){
  //   this.post_to_delete = null;
  // }

  // deletePost(){
  //   this.postService.deletePost(this.post_to_delete.id).subscribe(res => {
  //     this.postService.getAllPost().subscribe(result => {
  //       this.posts = result['data'];
  //     });
  //     // this.closeBtn.nativeElement.click();
  //   });
  // }


}
