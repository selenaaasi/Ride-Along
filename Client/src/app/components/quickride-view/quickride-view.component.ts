import { Component, OnInit } from '@angular/core';
import {Address} from '../../models/address';
/// <reference types="@types/googlemaps" />
@Component({
  selector: 'app-quickride-view',
  templateUrl: './quickride-view.component.html',
  styleUrls: ['./quickride-view.component.css']
})
export class QuickrideViewComponent implements OnInit {

  chatusername:string;
  constructor(){
    
  }
  
  ngOnInit() {
  }
  onqrCreatedClickedEvent(chatusername:string){
    console.log("QR CREATED -> SET CHAT USERNAME");
    console.log({chatusername});
    this.chatusername=chatusername;
  }
  onMarkerClickedEvent(chatusername:string){
    console.log("MARKER CLICKED -> SET CHAT USERNAME");
    console.log({chatusername});
    this.chatusername=chatusername;
  }
}
