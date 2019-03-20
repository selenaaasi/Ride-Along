
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Address} from '../../models/address';
import { GoogleMap } from '@agm/core/services/google-maps-types';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { QuickRideCreated, SaveMyQuickRide, QuickRideOriginSelected, QuickRideDestinationSelected, QuickRideOriginCleared, QuickRideDestinationCleared, SendMessage, DeleteQuckRide, RefreshMap } from 'src/app/store/actions/actions';
import { QuickRidePath } from 'src/app/models/quickridepath';
import { Marker } from 'src/app/models/marker';
import { QuickRide } from 'src/app/models/quickride';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { SocketService } from 'src/app/services/socket.service';



@Component({
  selector: 'app-quick-ride-inputs',
  templateUrl: './quick-ride-inputs.component.html',
  styleUrls: ['./quick-ride-inputs.component.css']
})
export class QuickRideInputsComponent implements OnInit {

  
  public centerlat:number;
  public centerlng:number;
  public placeholderOrigin:any;
  public placeholderDestination:any;
  public AddressOrigin:Address;
  public AddressDestination:Address;
  public OriginAndDestination=[]; 
  public originiconurl:string;
  public destinationiconurl:string;

  user$:Observable<User[]>;
  user:User;

  @Output()
  public qrcreatedClickedEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    private store$:Store<State>,
    private socket: SocketService
  ) {
    this.originiconurl="http://maps.google.com/mapfiles/kml/pal4/icon23.png";
    this.destinationiconurl="http://maps.google.com/mapfiles/kml/pal4/icon21.png";
    this.user$=this.store$.select(state=>state.user);
    this.user=null;
    this.centerlat=43.32472;
    this.centerlng=21.90333;
    this.AddressOrigin={
      lat:0,
      lng:0
    };
    this.AddressDestination={
      lat:0,
      lng:0
    };
    
   }
   ngOnInit() {

    if(this.user === null) {
      this.user$.subscribe(users => {
        if(users === undefined) {
          return;
        }
        users.forEach(user => this.user = user);
      });
    }
    this.placeholderOrigin="Insert origin";
    this.placeholderDestination="Insert destination";
  }
  public findOrigin() {
      let markerorigin = new Marker(this.AddressOrigin.lat,this.AddressOrigin.lng,this.originiconurl,this.user.username);
      this.store$.dispatch(new QuickRideOriginSelected(markerorigin));
  }
  public findDestination() {
    let markerdestination=new Marker(this.AddressDestination.lat,this.AddressDestination.lng,this.destinationiconurl,this.user.username);
    this.store$.dispatch(new QuickRideDestinationSelected(markerdestination));
  }
  public createQuickRide(){
    console.log('createQuickRide() - PROVERA DA LI JE USER ULOGOVAN!!!');

    if(this.user.username !== '' || this.user.username !== null || this.user.username !== undefined) {
      this.socket.createChat(this.user.username);
      this.qrcreatedClickedEvent.emit(this.user.username);
      this.store$.dispatch(new SendMessage(this.user.username,this.user.username,'')); 
    }
    let distance=this.calculatedDistance(this.AddressOrigin.lat,this.AddressOrigin.lng,this.centerlat,this.centerlng);
    let quickride=new QuickRide(this.AddressOrigin.lat,this.AddressOrigin.lng,this.AddressDestination.lat,this.AddressDestination.lng,distance,this.user.username,this.user.color);
    this.store$.dispatch(new SaveMyQuickRide(quickride));
   
  }
  public deleteQuickRide(){
  console.log("U Deletequick ride sam");
   let myuser=new User(this.user.username,'','','','','',-1);
   this.store$.dispatch(new DeleteQuckRide(myuser));
  }
  public clearOrigin(){
    let marker=(new Marker(this.AddressOrigin.lat,this.AddressOrigin.lng,this.originiconurl,this.user.username));
    this.store$.dispatch(new QuickRideOriginCleared(marker));
   
  }
  public clearDestination(){
    let marker=(new Marker(this.AddressDestination.lat,this.AddressDestination.lng,this.destinationiconurl,this.user.username));
    this.store$.dispatch(new QuickRideDestinationCleared(marker));
    
  }
  public refreshMap(){
    let myuser=new User(this.user.username,'','','','','',-1)
    this.store$.dispatch(new RefreshMap(myuser));
  }

  public handleAddressChangeOrigin(address:any) {
    this.AddressOrigin.lat=address.geometry.location.lat();
    this.AddressOrigin.lng=address.geometry.location.lng();

  }
  public handleAddressChangeDestination(address:any) {
    this.AddressDestination.lat=address.geometry.location.lat();
    this.AddressDestination.lng=address.geometry.location.lng();
 
  }
  public calculatedDistance(lat1,lon1,lat2,lon2){
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
    
  }
  public deg2rad(deg) {
    return deg * (Math.PI/180);
  }

}
