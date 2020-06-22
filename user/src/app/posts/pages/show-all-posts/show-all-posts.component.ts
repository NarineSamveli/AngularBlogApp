import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../../posts/services/post.service';
import { Post } from '../../models/post.model';
import { CommonService } from '../../../commonService/common.service';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-show-all-posts',
  templateUrl: './show-all-posts.component.html',
  styleUrls: ['./show-all-posts.component.scss']
})
export class ShowAllPostsComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public post_to_delete;
  public posts: any [];
  user: User;

  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private postService: PostService, private commonService: CommonService,
              private userService: UserService ) {
    this.user = new User();
    if (localStorage.getItem('loggedInID')) {
      this.userService.getUser(localStorage.getItem('loggedInID')).subscribe((user: User) => {
        this.user = user;
      });
    }
  }

  ngOnInit(): void {
    this.postService.getAllPost().subscribe(result => {
      // tslint:disable-next-line: no-string-literal
      this.posts = result['data'];
    });

    this.commonService.postAdded_Observable.subscribe(res => {
      this.postService.getAllPost().subscribe(result => {
        // tslint:disable-next-line: no-string-literal
        this.posts = result['data'];
      });
    });

  }

  get isAdmin() {
    return this.user.role === 'admin';
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

  likePost(post, i){
    this.commonService.setPostToShow(post);
    const whoLiked = this.user.fullName;
    if (whoLiked) {
      if (this.user.role === 'admin') {
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
            // const changeClass: HTMLElement = document.getElementsByClassName('likes')[i].getElementsByClassName('likesCount')[0] as HTMLElement;
            // changeClass.setAttribute('disabled', 'true') ;
            // changeClass.style.cursor = 'not-allowed';
            post.whoLiked = post.whoLiked.replace(whoLiked, '');
            post.likes = +post.likes - 1;
          } else {
            post.whoLiked = post.whoLiked + '\n' + whoLiked;
            post.whoLiked = post.whoLiked.replace('\n\n', '\n');
            post.likes = +post.likes + 1;
          }
        }
      }
      this.postService.updatePost(post).subscribe(res => {
      });
    }
  }

}
