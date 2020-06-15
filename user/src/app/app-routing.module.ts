import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './components/post/post.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';
import { UserResolveService } from './services/user-resolve.service';
import { UserCardComponent } from './pages/users-list/user-card/user-card.component';


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
