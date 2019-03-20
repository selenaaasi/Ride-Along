import { Action } from "@ngrx/store";
import { RECEIVE_MESSAGE, ReceiveMessage, SET_CHAT_USERNAME, SetChatUsername, POP_NOTIFICATION, PopNotification, GET_ALL_NOTIFICATIONS, GetAllNotifications, GET_ALL_NOTIFICATIONS_SUCCESS, GetAllNotificationsSuccess, CHANGE_NOTIFIACITON, ChangeNotification, DELETE_NOTIFICATION, DeleteNotification, LOG_OUT } from "../actions/actions";
import { MyMessage } from "src/app/models/message";
import { MyNotification } from "src/app/models/notification";

const initialState: MyNotification[] = [];

export default function(state: MyNotification[] = initialState, action: Action) {
    switch(action.type) {
        case DELETE_NOTIFICATION: {
            // console.log(action.type);
            const n = (action as DeleteNotification).notification;

            return state.filter(not => not !== n);
        }
        case CHANGE_NOTIFIACITON: {
            // console.log(action.type);
            const changeNot = (action as ChangeNotification).notification;
            const seen = (action as ChangeNotification).seen;
            const approve = (action as ChangeNotification).approve;

            return state.map(not => {
                if ( not.stopName === changeNot.stopName && 
                    not.reciverUsername === changeNot.reciverUsername &&
                    not.senderUsername === changeNot.senderUsername &&
                    not.date === not.date) {
                        not.seen = true;
                        return changeNot;
                } else {
                    return not;
                } 
            });
        }
        case GET_ALL_NOTIFICATIONS_SUCCESS: {
            // console.log(action.type);
            const allNot = (action as GetAllNotificationsSuccess).notifications;
            return [...state = allNot];
        }
        case POP_NOTIFICATION: {
            // console.log(action.type);
            const notification = (action as PopNotification).notification;
            // console.log({messages});
            return [...state, notification];
        }
        case LOG_OUT:{
            return [...state=[]];
        }
        default: {
            return [...state];
        }
        
    }    
}
