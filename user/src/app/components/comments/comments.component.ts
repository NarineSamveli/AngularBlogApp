import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments: any = [];
  comment: any = {};
  @Input() commentid: any;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    console.log(this.commentid)
    this.commentService.getAllComments(this.commentid).subscribe((res: any) => {
      if (res.success){
        this.comments = res.data;
      } else{
        alert('No Comments Found.');
      }
    });
  }

  saveComment(){
    this.comment.postId = this.commentid;
    // console.log(typeof(this.comment))
    // console.log(JSON.stringify(this.comment))
    this.comment.whoLiked = '';
    this.comment.likes = 0;
    this.comment.date = new Date();
    this.commentService.addComment(this.comment).subscribe((res: any) => {
      if (res.success){
        this.comment = {};
        this.ngOnInit();
      }
    });
  }

  likeComment(comment, i) {
    const whoLiked = localStorage.getItem('loggedInUser');
    if (whoLiked === 'admin') {
      // tslint:disable-next-line: max-line-length
      const changeClass: HTMLElement = document.getElementsByClassName('commentsBlock')[i].getElementsByClassName('commentlikesCount')[0] as HTMLElement;
      changeClass.setAttribute('disabled', 'true') ;
      changeClass.style.cursor = 'not-allowed';
    } else {
      if (comment.whoLiked === '') {
        comment.whoLiked = whoLiked;
        comment.likes = +comment.likes + 1;
      } else {
        if (comment.whoLiked.indexOf(whoLiked) >=  0 ) {
          // tslint:disable-next-line: max-line-length
          // const changeClass: HTMLElement = document.getElementsByClassName('commentsBlock')[i].getElementsByClassName('commentlikesCount')[0] as HTMLElement;
          // changeClass.setAttribute('disabled', 'true') ;
          // changeClass.style.cursor = 'not-allowed';
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

  deleteComment(id){
    this.commentService.deleteComment(id).subscribe((res: any) => {
      if (res.delete){
        this.ngOnInit();
      }
    });
  }

}
