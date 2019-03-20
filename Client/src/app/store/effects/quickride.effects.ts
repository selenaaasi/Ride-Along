import { Injectable } from "@angular/core";
import { RedisService } from "src/app/services/redis.service";
import { switchMap,map, mergeMap } from 'rxjs/operators';
import { Effect, Actions } from '@ngrx/effects';

import * as myActions from '../actions/actions';
import { from, Observable } from "rxjs";

import { Neo4jService } from "src/app/services/neo4j.service";

@Injectable()
export class QuickRideEffects {
    constructor(
        private redis: RedisService,
        private neo4j:Neo4jService,
        private actions$: Actions
    ) {}
    @Effect() 
    savemyquickride$ = this.actions$.ofType(myActions.SAVE_MY_QUICKRIDE)
    .pipe(
        switchMap((action) => {
            console.log("U EFFECT SAM prvi put")
            const quickride = (action as myActions.SaveMyQuickRide).quickride;
            return from(this.neo4j.saveMyQuickride(quickride))
            .pipe(
                map( quickrides => {
                    console.log("EFECT DRUGI PUT");
                    console.log(quickrides);
                    return new myActions.QuickRideListReceived(quickrides);
                })
            );
        })
    );
    @Effect() 
    refreshmap$ = this.actions$.ofType(myActions.REFRESH_MAP)
    .pipe(
        switchMap((action) => {
            console.log("REFRESH 1");
            const user = (action as myActions.RefreshMap).user;
            return from(this.neo4j.refreshMap(user))
            .pipe(
                map( quickrides => {
                    console.log("REFRESH 2");
                    return new myActions.QuickRideListReceived(quickrides);
                })
            );
        })
    );
    @Effect() 
    deletequickride$ = this.actions$.ofType(myActions.DELETE_QUICKRIDE)
    .pipe(
        switchMap((action) => {
            console.log("DELETE MAP EFFECTS");
            const user = (action as myActions.DeleteQuckRide).user;
            console.log(user);
            return from(this.neo4j.deleteQuickRide(user))
            .pipe(
                map( quickrides => {
                    console.log("Effects!!!");
                    return new myActions.DeleteQuickRideAnswer(quickrides);
                })
            );
        })
    );
    
}
