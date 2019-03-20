

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AgmCoreModule,MapsAPILoader} from '@agm/core';

// Bootstrap
import { CarouselModule } from 'ngx-bootstrap';
// import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { AgmDirectionModule } from 'agm-direction';
import { QuickRideInputsComponent } from './components/quick-ride-inputs/quick-ride-inputs.component';
import { QuickRideMapComponent } from './components/quick-ride-map/quick-ride-map.component';
import { QuickRideChatComponent } from './components/quick-ride-chat/quick-ride-chat.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeViewComponent } from './components/home-view/home-view.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { QuickrideViewComponent } from './components/quickride-view/quickride-view.component';
import { CarpoolViewComponent } from './components/carpool-view/carpool-view.component';
import { CreateRideComponent } from './components/create-ride/create-ride.component';
import { JoinRideComponent } from './components/join-ride/join-ride.component';
import { CarpoolRideComponent } from './components/carpool-ride/carpool-ride.component';
import { CarpoolRideListComponent } from './components/carpool-ride-list/carpool-ride-list.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { rootReducer,effects } from './store/store';
import { SettingsComponent } from './components/settings/settings.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { EffectsModule } from '@ngrx/effects';
import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { UserListViewComponent } from './components/user-list-view/user-list-view.component';
import { QuickrideView2Component } from './components/quickride-view2/quickride-view2.component';
import { QuickRideInputs2Component } from './components/quick-ride-inputs2/quick-ride-inputs2.component';

@NgModule({
  declarations: [
    AppComponent,
    QuickRideInputsComponent,
    QuickRideMapComponent,
    QuickRideChatComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeViewComponent,
    ProfileViewComponent,
    QuickrideViewComponent,
    CarpoolViewComponent,
    CreateRideComponent,
    JoinRideComponent,
    CarpoolRideComponent,
    CarpoolRideListComponent,
    SettingsComponent,
    ChatComponent,
    MessageComponent,
    NavbarLoginComponent,
    LoginViewComponent,
    UserListViewComponent,
    QuickrideView2Component,
    QuickRideInputs2Component,
  
    
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDNOJOHPAaq0SyPL6aqSkPbk0VWPSti_L0',
      libraries:["places"]
    }),
    AgmDirectionModule,
    GooglePlaceModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgbModule,
    CarouselModule.forRoot(),
    // StoreDevtoolsModule.instrument({ maxAge: 25 }),
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot(effects),
    
  ],
  providers: [],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
