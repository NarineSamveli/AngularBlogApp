import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/pages/login/login.component';
import { HomeComponent } from './home/pages/home/home.component';
import { PostComponent } from './posts/components/post/post.component';
import { PersonalPageComponent } from './users/pages/personal-page/personal-page.component';
import { RegisterComponent } from './authentication/pages//register/register.component';
import { AdminPanelComponent } from './admin/pages/admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add', component: PostComponent},
  { path: 'personalPage', component: PersonalPageComponent, canActivate: [AuthGuard], data: { roles: ['user'] }},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
