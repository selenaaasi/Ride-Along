import { Component, OnInit,Input } from '@angular/core';
import {CarpoolRide} from  'src/app/models/carpoolRide';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/store';
import { FindRides, PushNotification} from 'src/app/store/actions/actions';
import { RedisService } from 'src/app/services/redis.service';
import {Data} from "../../models/data";
import {Time} from "../../models/time";
import { Observable } from 'rxjs';
import {User} from "../../models/user";
import{Stop} from "../../models/stop";
import {Search} from "../../models/search";
import { MyNotification } from 'src/app/models/notification';
@Component({
  selector: 'app-join-ride',
  templateUrl: './join-ride.component.html',
  styleUrls: ['./join-ride.component.css']
})
export class JoinRideComponent implements OnInit {
    
  @Input()
  data: Data;
  @Input()
  origin: string;
  @Input()
  destination:string;

  findRides$:Observable<string[][]>;
  findUsers$:Observable<string[]>
  user$:Observable<User[]>;
  user:User;
  myData:Data;
  myOrigin:string;
  myDestination:string;
  stops:Stop[];
  listStop:string[];
  listUser:string[];
  constructor(private redisServise: RedisService,
    private route: ActivatedRoute,
    private store$: Store<State>) {
      this.findRides$ = this.store$.select(state => state.findRides);
      this.findUsers$=this.store$.select(state => state.usersFromService);
      this.user$=this.store$.select(state=>state.user);
      this.user=null;
      this.stops=[];

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


    this.findRides$.subscribe((findRides) => {
      if ( findRides !== undefined) {
        findRides.forEach((r) => {
          this.listStop=r;
          console.log(this.listStop);
          // console.log({user});
          // this.store$.dispatch(new GetFoldersFromDatabaseForUser(this.user));
        });
      }

    });
    // this.listStop = ['NESTO','NESTO','NESTO','NESTO'];

    this.findUsers$.subscribe((findRides) => {
      if ( findRides !== undefined) {
      //  findRides.forEach((r) => {
          this.listUser=findRides;
          console.log("USER")
          console.log(this.listUser);
          // console.log({user});
          // this.store$.dispatch(new GetFoldersFromDatabaseForUser(this.user));
       
      }

    })
    // const findRides = ['Voznje','Voznje','Voznje','Voznje'];
  }
  findRides(){
     //deo za dodavanje nodaVoznja
     console.log('findRides()');
     console.log(this.user);
     const search=new Search(this.data,this.origin,this.destination,this.user.username);
   
     this.store$.dispatch(new FindRides(search));
     this.myData=this.data;
     this.myOrigin=this.origin;
     this.myDestination=this.destination;
    this.data = new Data(0,0,0);
    
     this.origin='';
     this.destination='';

  }
  sendNotification(userfornot: string){
    console.log("U send notification sam");
    console.log(userfornot);
    const strDate = `${this.myData.day}.${this.myData.month}.${this.myData.year}`;
    const not = new MyNotification(this.user.username,userfornot,`${this.myOrigin} -> ${this.myDestination}`, strDate,false,false);
    this.store$.dispatch(new PushNotification(not));
  }

}
