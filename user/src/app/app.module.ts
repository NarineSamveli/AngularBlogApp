import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CommonService } from './common.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonalPageComponent } from './personal-page/personal-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ShowAllPostsComponent } from './show-all-posts/show-all-posts.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { ShowOnePostComponent } from './show-one-post/show-one-post.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UsersListComponent } from './users-list/users-list.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    HomeComponent,
    ShowPostComponent,
    AddPostComponent,
    PersonalPageComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AdminPanelComponent,
    UploadFormComponent,
    ShowAllPostsComponent,
    ShowOnePostComponent,
    UsersListComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
    MatExpansionModule
  ],
  exports: [
    RootComponent
  ],
  providers: [CommonService],
  bootstrap: [RootComponent]
})
export class AppModule { }
