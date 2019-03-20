import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { QuickrideViewComponent } from './components/quickride-view/quickride-view.component';
import { CreateRideComponent } from './components/create-ride/create-ride.component';
import { JoinRideComponent } from './components/join-ride/join-ride.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { QuickRide } from './models/quickride';
import { QuickrideView2Component } from './components/quickride-view2/quickride-view2.component';
const routes: Routes = [
  {path: '', component: LoginViewComponent},
  {path: 'home', component: HomeViewComponent},
  {path: 'profile', component: ProfileViewComponent},
  {path: 'quick-ride', component: QuickrideViewComponent},
  {path: 'create-carpool-ride', component: CreateRideComponent},
  {path: 'find-rides', component: JoinRideComponent},
  {path: 'quick-ride2', component: QuickrideView2Component},

    
  
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
