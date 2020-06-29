import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MatModule } from '../mat.module';
import { PostsModule } from '../posts/posts.module';

@NgModule({
  declarations: [
    AdminPanelComponent,
    UsersListComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatModule,
    PostsModule
  ],
  exports: [
    AdminPanelComponent,
    UsersListComponent,
    UserCardComponent
  ]
})
export class AdminModule { }

