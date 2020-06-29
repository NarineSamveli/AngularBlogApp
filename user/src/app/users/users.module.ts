import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../mat.module';
import { UsersRoutingModule } from './users-routing.module';
import { ShowPostComponent } from './pages/show-post/show-post.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';
import { PostsModule } from '../posts/posts.module';

@NgModule({
  declarations: [
    ShowPostComponent,
    PersonalPageComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatModule,
    PostsModule
  ],
  exports: [
    ShowPostComponent,
    PersonalPageComponent
  ]
})
export class UsersModule { }

