import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonService } from './core/commonService/common.service';
import { PostService } from './posts/services/post.service';
import { UserService } from './users/services/user.service';
import { AuthorizationService } from './authentication/services/authentication.service';
import { AdminModule } from './admin/admin.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { HomeModule } from './home/home.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentsModule } from './comments/comments.module';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    PostsModule,
    AdminModule,
    UsersModule,
    HomeModule,
    AuthenticationModule,
    CommentsModule,
    MatModule
  ],
  exports: [
    RootComponent
  ],
  providers: [
    CommonService,
    UserService,
    PostService,
    AuthorizationService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }


