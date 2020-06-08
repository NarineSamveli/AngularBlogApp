import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PersonalPageComponent } from './personal-page/personal-page.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './guards/auth.guard';

 // Определите путь маршрута и компонентов следующим образом:
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add', component: AddPostComponent},
  { path: 'personalPage', component: PersonalPageComponent, canActivate: [AuthGuard], data: { roles: ['user'] }},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
