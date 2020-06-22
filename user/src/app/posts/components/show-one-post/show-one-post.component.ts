import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../../posts/services/post.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../commonService/common.service';
import { MatExpansionPanel } from '@angular/material/expansion';


@Component({
  selector: 'app-show-one-post',
  templateUrl: './show-one-post.component.html',
  styleUrls: ['./show-one-post.component.scss']
})
export class ShowOnePostComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild(MatExpansionPanel, {static: true}) matExpansionPanelElement: MatExpansionPanel;
  public post: Post;
  panelOpenState = false;
  public isVisible;
  public isVisible2;

  constructor(private postService: PostService,
              private router: Router, private commonService: CommonService) {
      this.post = new Post();
   }

  ngOnInit(): void {
    this.commonService.postEdit_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_edited;
    });
    this.commonService.postShow_Observable.subscribe(res => {
      this.panelOpenState = false;
      this.matExpansionPanelElement.close();
      if (this.commonService.post_to_be_showed.description.length === 0) {
        this.isVisible = false;
        this.isVisible2 = true;
      } else {
        this.isVisible = true;
        this.isVisible2 = false;
      }
      this.post = this.commonService.post_to_be_showed;
    });
    this.commonService.postDelete_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_delete;
    });
  }

  addPost() {
    if (this.post.title){
      if (this.post.id){
        this.postService.updatePost(this.post).subscribe(res => {
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      } else {
        this.postService.addPost(this.post).subscribe(res => {
          // tslint:disable-next-line: no-string-literal
          this.commonService.DoShare(this.post['_id']);
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      }
    } else {
        alert('Title and Description required');
    }
  }

  togglePanel(event, post) {
    // tslint:disable-next-line: no-string-literal
    this.commonService.DoShare(post['_id']);
  }

}
