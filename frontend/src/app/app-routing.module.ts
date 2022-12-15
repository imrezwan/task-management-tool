import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllboardComponent } from './components/allboard/allboard.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/signup/signup.component';
import { IsAuthenticated } from './services/auth.guard';
import { LoggedInUserResolver } from './services/auth.resolvers';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [IsAuthenticated] },
  {
    path: 'signin',
    component: SignInComponent,
  },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'allboards',
    component: AllboardComponent,
    canActivate: [IsAuthenticated],
  },
  {
    path: 'boards/:id',
    component: HomeComponent,
    canActivate: [IsAuthenticated]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
