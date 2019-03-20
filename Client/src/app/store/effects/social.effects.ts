import { Injectable } from "@angular/core";
import { RedisService } from "src/app/services/redis.service";
import { Actions, Effect } from "@ngrx/effects";
import { SocketService } from "src/app/services/socket.service";
import * as myActions from '../actions/actions';
import { switchMap, map } from "rxjs/operators";
import { from } from "rxjs";
import { Neo4jService } from "src/app/services/neo4j.service";
@Injectable()
export class SocialEffects {
    constructor(
        private actions$: Actions,
        private neo4j:Neo4jService,
    ) {}


    @Effect() 
    requestuserlist$ = this.actions$.ofType(myActions.USERLIST_REQUESTED)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const user = (action as myActions.UserListRequested).user;
            return from(this.neo4j.requestUserList(user))
            .pipe(
                map( users => {
                    return new myActions.UserListRequestedAnswer(users);
                })
            );
        })
    );
      @Effect() 
    findfriends$ = this.actions$.ofType(myActions.FIND_FRIENDS)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const user = (action as myActions.FindFriends).user;
            return from(this.neo4j.findFriends(user))
            .pipe(
                map( users => {
                    return new myActions.UserListRequestedAnswer(users);
                })
            );
        })
    );

    @Effect() 
    findliked$ = this.actions$.ofType(myActions.FIND_LIKED)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const user = (action as myActions.FindLiked).user;
            return from(this.neo4j.findLiked(user))
            .pipe(
                map( users => {
                    return new myActions.UserListRequestedAnswer(users);
                })
            );
        })
    );

    @Effect() 
    finddisliked$ = this.actions$.ofType(myActions.FIND_DISLIKED)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const user = (action as myActions.FindDisliked).user;
            return from(this.neo4j.findDisliked(user))
            .pipe(
                map( users => {
                    return new myActions.UserListRequestedAnswer(users);
                })
            );
        })
    );

    @Effect() 
    userliked$ = this.actions$.ofType(myActions.USER_LIKED)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const users = (action as myActions.UserLiked).users;
            return from(this.neo4j.userLiked(users))
            .pipe(
                map( () => {
                    return new myActions.EmptyUserList();
                })
            );
        })
    );
    @Effect() 
    userdisliked$ = this.actions$.ofType(myActions.USER_DISLIKED)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const user = (action as myActions.UserDisliked).users;
            return from(this.neo4j.userDisiked(user))
            .pipe(
                map( users => {
                    return new myActions.EmptyUserList();
                })
            );
        })
    );
    @Effect() 
    friendadded$ = this.actions$.ofType(myActions.FRIEND_ADDED)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const user = (action as myActions.FriendAdded).users;
            return from(this.neo4j.addFriend(user))
            .pipe(
                map( users => {
                    return new myActions.EmptyUserList();
                })
            );
        })
    );
    @Effect() 
    mutualfriends$ = this.actions$.ofType(myActions.FIND_MUTUAL_FRIENDS)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const users = (action as myActions.FindMutualFriends).users;
            return from(this.neo4j.findMutual(users))
            .pipe(
                map( userss => {
                    return new myActions.UserListRequestedAnswer(userss);
                })
            );
        })
    );
    @Effect() 
    addsharedride$ = this.actions$.ofType(myActions.ADD_SHARED_RIDE)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const users = (action as myActions.FindMutualFriends).users;
            return from(this.neo4j.addSharedRide(users))
            .pipe(
                map( () => {
                    return new myActions.EmptyUserList();
                })
            );
        })
    );

    @Effect() 
    updateuser$ = this.actions$.ofType(myActions.UPDATE_USER)
    .pipe(
        switchMap((action) => {
            console.log("EFFECTS SOCIAL");
            const user = (action as myActions.UpdateUser).user;
            return from(this.neo4j.updateUser(user))
            .pipe(
                map( userk => {
                    return new myActions.LogInSuccess(userk,true);
                })
            );
        })
    );


}
