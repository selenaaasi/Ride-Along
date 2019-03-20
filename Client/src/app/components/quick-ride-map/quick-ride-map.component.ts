import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Marker } from 'src/app/models/marker';
import { MarkerOptions } from '@agm/core/services/google-maps-types';
import { Address } from 'src/app/models/address';
import { Observable } from 'rxjs';
import { QuickRidePath } from 'src/app/models/quickridepath';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { JoinChat, SetChatUsername } from 'src/app/store/actions/actions';
import { User } from 'src/app/models/user';

/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-quick-ride-map',
  templateUrl: './quick-ride-map.component.html',
  styleUrls: ['./quick-ride-map.component.css']
})
export class QuickRideMapComponent implements OnInit {

  
  @Output()
  public markerClickedEvent: EventEmitter<string> = new EventEmitter();

  public mapLat:number;
  public mapLng:number;
  public animation:any;
  public origin:any; 
  public destination:any;
  public waypoints:any;
  public renderOptions:any;
  public zoom:number; 
  public markerOptions:any ;
  public originIcon:string;
  public destinationIcon:string;
  public user:User;

  quickridespath$:Observable<QuickRidePath[]>;
  quickridesmarkers$:Observable<Marker[]>;
  origindestinationmarkers$:Observable<Marker[]>;
  user$:Observable<User[]>;

  constructor(private store$:Store<State> ) { 
    this.quickridespath$=this.store$.select(state=>state.quickridespath);
    this.quickridesmarkers$=this.store$.select(state=>state.quickridesmarkers);
    this.origindestinationmarkers$=this.store$.select(state=>state.origindestinationmarkers);
    this.user$=this.store$.select(state=>state.user);
    this.user = null;
  }
 
  ngOnInit() {
    if(this.user === null || this.user === undefined) {
      this.user$.subscribe(users => {
        if(users === undefined) {
          return;
        }
        users.forEach(user => this.user = user);
      });
    }
    this.mapLat= 43.3259947;
    this.mapLng=21.89538820000007;
    this.zoom=13;
    
  }
  clickedMarker(username:string) {
   this.markerClickedEvent.emit(username);
    this.store$.dispatch(new JoinChat(username,this.user.username));
  }

}
