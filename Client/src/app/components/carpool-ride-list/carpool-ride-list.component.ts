import { Component, OnInit } from '@angular/core';
import{CarpoolRide} from '../../models/carpoolRide';
import {Observable}from 'rxjs';
import {Store} from '@ngrx/store'
import { State } from '../../store/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carpool-ride-list',
  templateUrl: './carpool-ride-list.component.html',
  styleUrls: ['./carpool-ride-list.component.css']
})
export class CarpoolRideListComponent implements OnInit {
  
  carpoolRides$:Observable<CarpoolRide[]>;
  rides:CarpoolRide[];
  constructor(private store$: Store<State>) { 
      this.carpoolRides$ = this.store$.select(state => state.carpoolRide);
      this.rides=[];
    }

  ngOnInit() {
     this. carpoolRides$.subscribe((rides) => {
        rides.forEach((r) => {
         this.rides.push (r);
            console.log(r);
    //       console.log("U CARPOOL_RIDE_LIST_COMPONENT_SAM");
    //       // console.log({user});
    //       // this.store$.dispatch(new GetFoldersFromDatabaseForUser(this.user));
         });
       

     });

  }

}
