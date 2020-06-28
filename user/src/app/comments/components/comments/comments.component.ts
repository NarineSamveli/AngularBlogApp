import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { CommonService } from '../../../core/commonService/common.service';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  user: User;
  comments: any = [];
  comment: any = {};
  @Input() commentid: any;
  ngStyleCursor = 'pointer';

  constructor(private commonService: CommonService, private commentService: CommentService,
              private userService: UserService ) {
    this.user = new User();
    if (localStorage.getItem('loggedInID')) {
      this.userService.getUser(localStorage.getItem('loggedInID')).subscribe((user: User) => {
          // tslint:disable-next-line: no-string-literal
          this.user = user['data'];
      });
    }

    this.commonService.newId.subscribe(id => {
      this.commentid = id;
      this.commentService.getAllComments(this.commentid).subscribe((res: any) => {
        // tslint:disable-next-line: no-string-literal
        console.log()
        if (res['status'] === 200){
          // tslint:disable-next-line: no-string-literal
          this.comments = res['data'];
        } else{
          alert('No Comments Found.');
        }
      });
    });

   }

  ngOnInit() {
    if (this.commentid.id !== '') {
      this.commentService.getAllComments(this.commentid).subscribe((res: any) => {
        // tslint:disable-next-line: no-string-literal
        if (res['status'] === 200){
          // tslint:disable-next-line: no-string-literal
          this.comments = res['data'];
        } else{
          alert('No Comments Found.');
        }
      });
    }
  }

  get isAdmin() {
    return this.user.role === 'admin';
  }

  get isUser() {
    return this.user.role === 'user';
  }

  saveComment(){
    this.comment.postId = this.commentid;
    // console.log(typeof(this.comment))
    // console.log(JSON.stringify(this.comment))
    this.comment.whoLiked = '';
    this.comment.author = localStorage.getItem('loggedInUser');
    this.comment.likes = 0;
    this.comment.date = new Date();
    this.commentService.addComment(this.comment).subscribe((res: any) => {
      // tslint:disable-next-line: no-string-literal
      if (res['status'] === 200){
        this.comment = {};
        this.ngOnInit();
      }
    });
  }

  likeComment(comment, i) {
    const whoLiked = this.user.fullName;
    if (whoLiked) {
      if (this.user.role === 'admin') {
        this.ngStyleCursor = 'not-allowed';
      } else {
        if (comment.whoLiked === '') {
          comment.whoLiked = whoLiked;
          comment.likes = +comment.likes + 1;
        } else {
          if (comment.whoLiked.indexOf(whoLiked) >=  0 ) {
            comment.whoLiked = comment.whoLiked.replace(whoLiked, '');
            comment.likes = +comment.likes - 1;
          } else {
            comment.whoLiked = comment.whoLiked + '\n' + whoLiked;
            comment.whoLiked = comment.whoLiked.replace('\n\n', '\n');
            comment.likes = +comment.likes + 1;
          }
        }
      }

      this.commentService.updateComment(comment).subscribe(res => {
      });
    }
  }

  deleteComment(comm){
    // tslint:disable-next-line: no-string-literal
    this.commentService.deleteComment(comm['_id']).subscribe((res: any) => {
      // tslint:disable-next-line: no-string-literal
      if (res['status'] === 200){
        this.ngOnInit();
      }
    });
  }

}
