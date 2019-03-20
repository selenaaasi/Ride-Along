import { Injectable } from "@angular/core";
import { RedisService } from "src/app/services/redis.service";
import {Neo4jService} from "src/app/services/neo4j.service";
import { switchMap,map } from 'rxjs/operators';
import { Effect, Actions } from '@ngrx/effects';
import * as myActions from '../actions/actions';
import { async } from "@angular/core/testing";
import { from, Observable } from "rxjs";
import { User } from "src/app/models/user";

@Injectable()
export class CarpoolRidesEffects {
    constructor(
        private redis: RedisService,
        private neo4j:Neo4jService,
        private actions$: Actions
    ) {}

    @Effect() 
    carpoolRide$ = this.actions$.ofType(myActions.ADD_RIDE)
    .pipe(
        switchMap((action) => {
           const carpoolRide = (action as myActions.AddRide).carpoolRide;
           console.log(carpoolRide);
           console.log("Usao u effects");
            return from(this.neo4j.addRide(carpoolRide))
            .pipe(
                map( ride => {
                    console.log("Effects!!!");
                    return new myActions.AddRideSuccess( true,ride);
                })
            );
        })
    );


    @Effect() 
    logIn$ = this.actions$.ofType(myActions.LOG_IN)
    .pipe(
        switchMap((action) => {
            const user = (action as myActions.LogIn).user;
            return from(this.redis.getAllRides(user))
            .pipe( 
                map( myRides => {
                    console.log("Effects za myRides");
                    console.log(myRides);
                    let niz = myRides.map(ride => JSON.parse(ride));
                    console.log({niz});
                    return new myActions.GetMyRides(niz);
                })
            );
        })
    );

    @Effect() 
    findRides$ = this.actions$.ofType(myActions.FIND_RIDES)
    .pipe(
        switchMap((action) => {
            const search = (action as myActions.FindRides).search
            return from(this.neo4j.findRides(search))
            .pipe( 
                map( rides => {
                    console.log("Effects za myRides");
                    console.log(rides);
                    return new myActions.FindRidesSuccess(rides) //prosledjuje usera u reducer
                })
            );
        })
    );





    
}