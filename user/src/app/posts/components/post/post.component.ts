import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../../posts/services/post.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../core/commonService/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  addFormGroup: FormGroup;
  base64File: string = null;
  filename: string = null;
  ngStyleDescriptionBlock = 'block';
  ngStyleImageBlock = 'block';
  public postText = [];
  public postImage = [];
  postDescription = '';

  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post: Post;

  constructor(private postService: PostService, private formBuilder: FormBuilder,
              private router: Router, private commonService: CommonService) {
      // if (!localStorage.getItem('loggedInUser')){
      //     this.router.navigate(['/']);
      // }
      this.post = new Post();
   }

  ngOnInit(): void {
    this.commonService.postEdit_Observable.subscribe(res => {
      this.post = this.commonService.post_to_be_edited;
      this.postText = this.post.description;
      this.postImage = this.post.image;
    });

    // this.addFormGroup = this.formBuilder.group({
    //   exampleInputTitle1: ['', Validators.required],
    //   exampleInputDescription1: ['', Validators.required]
    // });
  }

  changeText(e, i){
    if (this.postText[i] !== e) {
      this.postText[i] = e;
    }
  }

  addPost() {
    if (this.post.title){
      // tslint:disable-next-line: no-string-literal
      if (this.post['_id']){
        this.post.description = this.postText;
        this.post.image = this.postImage;
        this.postService.updatePost(this.post).subscribe(res => {
          this.closeBtn.nativeElement.click();
          this.commonService.notifyPostAddition();
        });
      } else {
        this.post.image = this.postImage;
        this.post.description = this.postText;
        this.postService.addPost(this.post).subscribe(res => {
          // tslint:disable-next-line: no-string-literal
          if (res['status'] === 200) {
            this.closeBtn.nativeElement.click();
            this.commonService.notifyPostAddition();
          }
        });
      }
    } else {
        alert('Title required');
    }
  }

  show(){
    if (this.postDescription) {
      this.postText.push(this.postDescription);
    }

    if (this.base64File) {
      this.postImage.push(this.base64File);
    }
    this.filename = '';
    this.base64File = '';

  }

  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader();
      fReader.readAsDataURL(file);
      // tslint:disable-next-line: no-shadowed-variable
      fReader.onloadend = (e: any) => {
        this.filename = file.name;
        this.base64File = e.target.result;
        // this.post.image = this.base64File;
      };
    } catch (error) {
      this.filename = null;
      this.base64File = null;
      console.log('no file was selected...');
    }
  }
}
