import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { CommonService } from '../../services/common.service';

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

  constructor(private postService: PostService, private commonService: CommonService) { }

  ngOnInit(): void { }

  getAllPost(){
    this.postService.getAllPost().subscribe(result => {
      // tslint:disable-next-line: no-string-literal
      this.posts = result['data'];
    });
  }

  unsetDelete(){
    this.post_to_delete = null;
    localStorage.setItem('PostToDelete', null);
  }

  deletePost(){
    this.post_to_delete = localStorage.getItem('PostToDelete');
    this.postService.deletePost(this.post_to_delete).subscribe(res => {
      this.getAllPost();
      this.commonService.notifyPostAddition();
      localStorage.setItem('PostToDelete', null);
      this.closeBtn.nativeElement.click();
    });
  }


}
