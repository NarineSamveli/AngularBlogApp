import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { ShowPostComponent } from './pages/show-post/show-post.component';
import { PostComponent } from './components/post/post.component';
import { CommonService } from './services/common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ShowAllPostsComponent } from './pages/show-all-posts/show-all-posts.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { ShowOnePostComponent } from './components/show-one-post/show-one-post.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { UserCardComponent } from './pages/users-list/user-card/user-card.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    HomeComponent,
    ShowPostComponent,
    PostComponent,
    PersonalPageComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AdminPanelComponent,
    ShowAllPostsComponent,
    ShowOnePostComponent,
    UsersListComponent,
    DeleteModalComponent,
    UserCardComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatButtonModule,
    MatTabsModule,
    MatBadgeModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSelectModule,
    RecaptchaModule
  ],
  exports: [
    RootComponent
  ],
  providers: [
    CommonService,
    UserService,
    PostService
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
