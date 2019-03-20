import { Injectable } from "@angular/core";
import { RedisService } from "src/app/services/redis.service";
import { switchMap,map } from 'rxjs/operators';
import { Effect, Actions } from '@ngrx/effects';

import * as myActions from '../actions/actions';
import { async } from "@angular/core/testing";
import { from, Observable } from "rxjs";
import { User } from "src/app/models/user";
import { SocketService } from "src/app/services/socket.service";
import { MyMessage } from "src/app/models/message";

@Injectable()
export class UsersEffects {
    constructor(
        private redis: RedisService,
        private actions$: Actions,
        private scoket: SocketService
    ) {}
    @Effect()
    deleteNotifiaction$ = this.actions$.ofType(myActions.DELETE_NOTIFICATION)
    .pipe(
        switchMap((action) => {
            const not = (action as myActions.DeleteNotification).notification;

            // console.log('Effect sendUSername$');
            // this.scoket.sendUsername(username);
            console.log('Effect delete!');
            this.redis.deleteNotification(not);
            return new Observable();
        })
    );
    @Effect()
    sendUsername$ = this.actions$.ofType(myActions.SEND_USERNAME_FOR_SOCKET_ID)
    .pipe(
        switchMap((action) => {
            const username = (action as myActions.SendUSernameForSocketID).username;

            this.scoket.sendUsername(username);
            return new Observable();
        })
    );

    @Effect()
    changeNotification$ = this.actions$.ofType(myActions.CHANGE_NOTIFIACITON_REDIS)
    .pipe(
        switchMap((action) => {
            const oldNot = (action as myActions.ChangeNotificationRedis).oldNotification;
            const newNot = (action as myActions.ChangeNotificationRedis).newNotification;

            console.log(myActions.CHANGE_NOTIFIACITON , {oldNot,newNot});
            // this.scoket.pushNotification(not);
            this.scoket.changeNotification(oldNot,newNot);
            return this.scoket.popNotification()
            .pipe(
                map((notifiation) => {
                    console.log({notifiation});
                    return new myActions.PopNotification(notifiation);
                })
            );
        })
    );

    @Effect()
    AllNotifiaction$ = this.actions$.ofType(myActions.GET_ALL_NOTIFICATIONS)
    .pipe(
        switchMap((action) => {
            const username = (action as myActions.GetAllNotifications).username;
            console.log(myActions.GET_ALL_NOTIFICATIONS , {username});
            // this.scoket.pushNotification(not);
            this.scoket.getAllNotificationsEmit(username);

            return this.scoket.getAllNotificationsOn()
            .pipe(
                map((allNot) => {
                    console.table(allNot);
                    return new myActions.GetAllNotificationsSuccess(allNot);
                })
            );
        })
    );

    @Effect()
    notifiaction$ = this.actions$.ofType(myActions.PUSH_NOTIFICATION)
    .pipe(
        switchMap((action) => {
            const not = (action as myActions.PushNotification).notification;
            console.log({not});
            this.scoket.pushNotification(not);

            return this.scoket.popNotification()
            .pipe(
                map((notifiation) => {
                    console.log({notifiation});
                    return new myActions.PopNotification(notifiation);
                })
            );
        })
    );
    @Effect() 
    joinChat$ = this.actions$.ofType(myActions.JOIN_CHAT)
    .pipe(
        switchMap((action) => {
            const myUsername = (action as myActions.JoinChat).myUsername;
            const chatUsername = (action as myActions.JoinChat).chatUsername;

            this.scoket.joinChat(chatUsername,myUsername);
            
            return from(this.scoket.reciveAllMessages())
            .pipe(
                map( (messages) => {
                    return new myActions.ReceiveMessage(messages);
                })
            );
        })
    );
    @Effect() 
    sendMessage$ = this.actions$.ofType(myActions.SEND_MESSAGE)
    .pipe(
        switchMap((action) => {
            const message = (action as myActions.SendMessage).message;
            const username = (action as myActions.SendMessage).username;
            const chatusername=(action as myActions.SendMessage).chatUsername;


            this.scoket.sendMessage(chatusername,username,message);
            return from(this.scoket.reciveAllMessages())
            .pipe(
                map( (messages) => {
                    console.log({messages});
                    return new myActions.ReceiveMessage(messages);
                })
            );
        })
    );
    @Effect() 
    logIn$ = this.actions$.ofType(myActions.LOG_IN)
    .pipe(
        switchMap((action) => {
            const user = (action as myActions.LogIn).user;
            return from(this.redis.logInUser(user))
            .pipe(
                map( logInUser => {
                    return new myActions.LogInSuccess(logInUser, true);
                })
            );
        })
    );
    
}
