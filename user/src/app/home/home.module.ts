import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostsModule } from '../posts/posts.module';
import { MatModule } from '../mat.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatModule,
    PostsModule
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class HomeModule { }


