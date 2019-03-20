import { Component, OnInit,Input } from '@angular/core';
import {CarpoolRide} from  'src/app/models/carpoolRide';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { AddRide} from 'src/app/store/actions/actions';
import { RedisService } from 'src/app/services/redis.service';
import {Data} from "../../models/data";
import {Time} from "../../models/time";
import { Observable } from 'rxjs';
import {User} from "../../models/user";

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.component.html',
  styleUrls: ['./create-ride.component.css']
})
export class CreateRideComponent implements OnInit {

  @Input()
  data: Data;
  @Input()
  time: Time;
  @Input()
  origin: string;
  @Input()
  seats: number;

  @Input()
  destination:string;

  @Input()
  stop:string;

  user$:Observable<User[]>;
  user:User;
  
  
  countries = [
    1,2,3,4
  ];
  click=0;
 selectedValue = null;
 stops=[];

  constructor(
    private redisServise: RedisService,
    private route: ActivatedRoute,
    private store$: Store<State>


  ) 
  { 
    this.user$=this.store$.select(state=>state.user);
    this.user=null;
  }

  ngOnInit() {

    if(this.user === null) {
      this.user$.subscribe(users => {
        console.log("Usao gde treba!!!");
        if(users === undefined) {
          return;
        }
        users.forEach(user => {this.user = user 
        console.log(user);
        });
      });
    }
  }
 
  addStop(stop:string){
    this.click=this.click+1;
    if(this.click<4)
    this.stops.push(stop);


  }

  addRide(){
    //deo za dodavanje nodaVoznja
    console.log('addRide()');
    console.log(this.user);
    const ride = new CarpoolRide(this.data,this.time,this.origin,this.seats,this.destination,this.stops,this.user.username);
    // this.redisServise.logInUser(userCon);
    console.log(ride);
    
    this.store$.dispatch(new AddRide(ride));
    this.data = new Data(0,0,0);
    this.time = new Time(0,0);
    this.origin='';
    this.destination='';
    this.stop='';
    this.seats=1;
    this.stops=[];
   

  }}


