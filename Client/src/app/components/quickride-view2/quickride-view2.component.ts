import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quickride-view2',
  templateUrl: './quickride-view2.component.html',
  styleUrls: ['./quickride-view2.component.css']
})
export class QuickrideView2Component implements OnInit {

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
