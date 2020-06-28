import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../mat.module';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    MatModule
  ],
  exports: [
    CommentsComponent
  ]
})
export class CommentsModule { }



