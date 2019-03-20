//// import section////
import { Action } from "@ngrx/store";
import { User } from "src/app/models/user";
import {QuickRidePath} from "src/app/models/quickridepath";
import { QuickRide } from "src/app/models/quickride";
import { Marker } from "src/app/models/marker";
import { MyNotification } from "src/app/models/notification";
import { MyMessage } from "src/app/models/message";
import { CarpoolRide } from "src/app/models/carpoolRide";
import { Search } from "src/app/models/search";
//// SignUp and LogIn section////
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
// samo dodato kao podsetnik da mogu da se naprave vise slucajvea kad je neuspesno
// i da se prikaze korisniku na razlicite nacine
export const SIGN_UP_UNSUCCESSFUL = "SIGN_UP_UNSUCCESSFUL";
export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_UNSUCCESSFUL = "LOG_IN_UNSUCCESSFUL";
//// QuickRides section////
export const QUICK_RIDE_ORIGIN_SELECTED="QUICK_RIDE_ORIGIN_SELECTED";
export const QUICK_RIDE_DESTINATION_SELECTED="QUICK_RIDE_DESTINATION_SELECTED";
export const QUICK_RIDE_ORIGIN_CLEARED="QUICK_RIDE_ORIGIN_CLEARED";
export const QUICK_RIDE_DESTINATION_CLEARED="QUICK_RIDE_DESTINATION_CLEARED";

export const QUICK_RIDE_CREATED="QUICK_RIDE_CREATED";
export const SAVE_MY_QUICKRIDE="SAVE_MY_QUICKRIDE";
export const QUICK_RIDE_LIST_RECEIVED="QUICK_RIDE_LIST_RECEIVED";
export const REFRESH_MAP="REFRESH_MAP";
export const DELETE_QUICKRIDE="DELETE QUICKRIDE";
export const DELETE_QUICKRIDE_ANSWER="DELETE_QUICKRIDE_ANSWER";
export const NEED_UPDATE="NEED_UPDATE";

//// Chat section////
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const CREATE_CHAT = 'CREATE_CHAT';
export const JOIN_CHAT = 'JOIN_CHAT';
export const SET_CHAT_USERNAME = 'SET_CHAT_USERNAME';
export const GET_USER = 'GET_USER';
export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
export const POP_NOTIFICATION = 'POP_NOTIFICATION';
export const GET_ALL_NOTIFICATIONS = 'GET_ALL_NOTIFICATIONS';
export const GET_ALL_NOTIFICATIONS_SUCCESS = 'GET_ALL_NOTIFICATIONS_SUCCESS';
export const SEEN_NOTIFICATION = 'SEEN_NOTIFICATION';
export const APPROVE_NOTIFICATION = 'APPROVE_NOTIFICATION'; 
export const DECLINE_NOTIFICATION = 'DECLINE_NOTIFICATION';
export const CHANGE_NOTIFIACITON = 'CHANGE_NOTIFIACITON';
export const CHANGE_NOTIFIACITON_SUCCESS = 'CHANGE_NOTIFIACITON_SUCCESS';
export const CHANGE_NOTIFIACITON_REDIS = 'CHANGE_NOTIFIACITON_REDIS';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const SEND_USERNAME_FOR_SOCKET_ID = 'SEND_USERNAME_FOR_SOCKET_ID';

//// Social section////
export const USERLIST_REQUESTED="USERLIST_REQUESTED";
export const USERLIST_REQUESTED_ANSWER="USERLIST_REQUESTED_ANSWER"
export const FIND_FRIENDS="FIND_FRIENDS";
export const FIND_LIKED="FIND_LIKED";
export const FIND_DISLIKED="FIND_DISLIKED";
export const FIND_MUTUAL_FRIENDS="FIND_MUTUAL_FRIENDS";
export const FRIEND_ADDED="FRIEND_ADDED";
export const USER_LIKED="USER_LIKED";
export const USER_DISLIKED="USER_DISLIKED";
export const ADD_SHARED_RIDE="ADD_SHARED_RIDE";
export const EMPTY_USERLIST="EMPTY_USERLIST";
export const UPDATE_USER="UPDATE_USER";
//// Log out ////
export const LOG_OUT="LOG_OUT";
////Carpool section////
export const ADD_RIDE="ADD_RIDE";
export const ADD_RIDE_SUCCESSFULL="ADD_RIDE_SUCCESSFULL";
export const GET_MY_RIDES="GET_MY_RIDES";
export const FIND_RIDES="FIND_RIDES";
export const FIND_RIDES_SUCCESS="FIND_RIDES_SUCCESS";

export class AddRide implements Action{
    type: string=ADD_RIDE;
    constructor(public carpoolRide:CarpoolRide){
        console.log("Usao u AddRide u actions");
    }
}
export class AddRideSuccess implements Action{
    type: string =ADD_RIDE_SUCCESSFULL;
    constructor(public success: boolean, public carpoolRide:CarpoolRide) {
        console.log("Usao u AddRideSuccess u actions");
    }
}
export class FindRides implements Action{
    type: string =FIND_RIDES;
    constructor(public search:Search) {
        console.log("Usao u FindRides u actions");
    }
}
export class FindRidesSuccess implements Action{
    type: string = FIND_RIDES_SUCCESS;
    constructor(public rides:any[]) {}
}
export class GetMyRides implements Action{
    type: string =  GET_MY_RIDES;
    constructor(public myRides:CarpoolRide[]) {}

}
export class LogOut implements Action {
    type =LOG_OUT;
    constructor (){}
}
export class UpdateUser implements Action {
    type=UPDATE_USER;
    constructor(public user:User){}
}
export class EmptyUserList implements Action {
    type=EMPTY_USERLIST;
    constructor(){}
}
export class AddSharedRide implements Action {
    type=ADD_SHARED_RIDE;
    constructor(public users:User[]){}
}
export class UserDisliked implements Action {
    type=USER_DISLIKED;
    constructor(public users:User[]){}
}
export class UserLiked implements Action {
    type=USER_LIKED;
    constructor(public users:User[]){}
}
export class FriendAdded implements Action {
    type=FRIEND_ADDED;
    constructor (public users:User[]){}
}
export class FindFriends implements Action {
    type=FIND_FRIENDS;
    constructor (public user:User){}
}
export class FindLiked implements Action {
    type=FIND_LIKED;
    constructor (public user:User){}
}
export class FindDisliked implements Action {
    type=FIND_DISLIKED;
    constructor (public user:User){}
}
export class FindMutualFriends implements Action {
    type=FIND_MUTUAL_FRIENDS;
    constructor (public users:User[] ){}
}
export class UserListRequestedAnswer implements Action {
    type=USERLIST_REQUESTED_ANSWER;
    constructor (public users:User[]){console.log("USERLISTANSWER")}
}
export class UserListRequested implements Action{
    type=USERLIST_REQUESTED;
    constructor(public user:User){console.log("Userlistrequested")}
}
export class NeedUpdate implements Action {
    type=NEED_UPDATE;
    constructor(public proba:string){console.log("NEED");}
}
export class DeleteQuickRideAnswer implements Action{
    type=DELETE_QUICKRIDE_ANSWER;
    constructor(public quickridelist:QuickRide[]){console.log("DOBRA JE AKCIJA")}
}
export class DeleteQuckRide implements Action{
    type=DELETE_QUICKRIDE;
    constructor(public user:User){}
}
export class RefreshMap implements Action{
    type=REFRESH_MAP;
    constructor(public user:User){}
}





export class DeleteNotification implements Action {
    type = DELETE_NOTIFICATION;
    constructor(public notification: MyNotification ) {}
}


export class SendUSernameForSocketID implements Action {
    type = SEND_USERNAME_FOR_SOCKET_ID;
    constructor(public username: string ) {}
}


export class ChangeNotificationRedis implements Action {
    type = CHANGE_NOTIFIACITON_REDIS;
    constructor(public oldNotification: MyNotification, public newNotification:MyNotification ) {}
}

export class ChangeNotificationSuccess implements Action {
    type = CHANGE_NOTIFIACITON_SUCCESS;
    constructor(public notification: MyNotification) {}
}
export class ChangeNotification implements Action {
    type = CHANGE_NOTIFIACITON;
    constructor(public notification: MyNotification, public seen: boolean = true, public approve: boolean = true) {}
}


export class GetUser implements Action {
    type = GET_ALL_NOTIFICATIONS_SUCCESS;
    constructor() {}
}


export class GetAllNotificationsSuccess implements Action {
    type = GET_ALL_NOTIFICATIONS_SUCCESS;
    constructor(public notifications: MyNotification[]) {}
}

export class GetAllNotifications implements Action {
    type = GET_ALL_NOTIFICATIONS;
    constructor(public username: string) {}
}


export class PopNotification implements Action {
    type = POP_NOTIFICATION;
    constructor(public notification: MyNotification) {}
}


export class PushNotification implements Action {
    type = PUSH_NOTIFICATION; 
    constructor(public notification: MyNotification) {}
}


export class SetChatUsername implements Action {
    type = SET_CHAT_USERNAME;
    constructor(public message: MyMessage) {}
}

export class CreateChat implements Action {
    type = CREATE_CHAT;
    constructor(public username: string) {}
}
export class JoinChat implements Action {
    type = JOIN_CHAT;
    constructor(public chatUsername: string, public myUsername: string) {}
}
export class SendMessage implements Action {
    type = SEND_MESSAGE;
    constructor(public chatUsername:string, public username: string, public message: string) {}
}
export class ReceiveMessage implements Action {
    type = RECEIVE_MESSAGE;
    constructor(public message: any) {}
}
export class QuickRideOriginSelected implements Action{
    type:string =QUICK_RIDE_ORIGIN_SELECTED;
    constructor(public markerorigin:Marker){}
}
export class QuickRideDestinationSelected implements Action{
    type:string =QUICK_RIDE_DESTINATION_SELECTED;
    constructor(public markerdestnation:Marker){}
}
export class QuickRideOriginCleared implements Action{
    type:string =QUICK_RIDE_ORIGIN_CLEARED;
    constructor(public markerorigin:Marker){}
}
export class QuickRideDestinationCleared implements Action{
    type:string =QUICK_RIDE_DESTINATION_CLEARED;
    constructor(public markerdestnation:Marker){}
}
export class SaveMyQuickRide implements Action {
    type:string=SAVE_MY_QUICKRIDE;
    constructor(public quickride:QuickRide){console.log("U SAVE")}
}
export class QuickRideCreated implements Action{
    
    type:string = QUICK_RIDE_CREATED;
    constructor(public quickride: QuickRidePath) {} 
}
export class QuickRideListReceived implements Action{
    type:string=QUICK_RIDE_LIST_RECEIVED;
    constructor(public quickridelist: QuickRide[]) {} 
}
export class LogIn implements Action {
    type: string = LOG_IN;
    constructor(public user: User) {}
}
export class LogInSuccess implements Action {
    type: string = LOG_IN_SUCCESS;
    constructor(public user: User, public success: boolean) {}
}

export class SignUp implements Action {
    type: string = SIGN_UP;
    constructor(public user: User) {}
}
export class SingUpSuccess implements Action {
    type: string = SIGN_UP_SUCCESS;
    constructor(public success: boolean, public user: User) {}
}

