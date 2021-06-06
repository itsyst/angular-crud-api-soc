import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './pages/posts/posts.component';
import { PostService } from './services/post/post.service';
import { AppErrorHandler } from './common/app-error-handler';
import { GithubFollowersComponent } from './pages/github-followers/github-followers.component';
import { GithubFollowersService } from './services/github/github-followers.service';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GithubProfileComponent } from './pages/github-profile/github-profile.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarComponent } from './pages/car/car.component';
import { CarProfileComponent } from './pages/car-profile/car-profile.component';
import { CarService } from './services/car/car.service';
import { NoAccessComponent } from './error/no-access/no-access.component';

const routes: Routes = [
      {
        path: '', redirectTo: '', pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'followers/:id/:username',
        component: GithubProfileComponent
      },
      {
        path: 'followers',
        component: GithubFollowersComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      },
      {
        path: 'cars/:car',
        component: CarProfileComponent
      },
      {
        path: 'cars',
        component: CarComponent
      },
      {
        path: 'no-access',
        component: NoAccessComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    GithubFollowersComponent,
    HomeComponent,
    GithubProfileComponent,
    NotFoundComponent,
    NavbarComponent,
    CarComponent,
    CarProfileComponent,
    NoAccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PostService,
    GithubFollowersService,
    CarService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
