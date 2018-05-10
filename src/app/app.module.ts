import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CampgroundsComponent } from './campgrounds/campgrounds.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CampgroundDetailsComponent } from './campground-details/campground-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeedComponent } from './feed/feed.component';
import { RatedComponent } from './rated/rated.component';

const appRoutes: Routes = [
  { path: 'campgrounds/:id', component: CampgroundDetailsComponent },
  {
    path: 'campgrounds',
    component: CampgroundsComponent,
    data: { title: 'Campgrounds List' }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'User Data' }
  },
  {
    path: 'feed',
    component: FeedComponent,
    data: { title: 'Feed Data' }
  },
  {
    path: 'top-rated',
    component: RatedComponent,
    data: { title: 'TopRated Data' }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { title: 'User Data' }
  },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CampgroundsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CampgroundDetailsComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    NavbarComponent,
    FeedComponent,
    RatedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
