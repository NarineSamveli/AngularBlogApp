import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { MatModule } from '../mat.module';
import { CommentsModule } from '../comments/comments.module';
import { ShowAllPostsComponent } from './pages/show-all-posts/show-all-posts.component';
import { ShowOnePostComponent } from './components/show-one-post/show-one-post.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [
    PostComponent,
    ShowAllPostsComponent,
    ShowOnePostComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatModule,
    CommentsModule
  ],
  exports: [
    PostComponent,
    ShowAllPostsComponent,
    ShowOnePostComponent,
    DeleteModalComponent
  ]
})
export class PostsModule { }

