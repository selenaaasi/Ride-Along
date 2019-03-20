import { Action } from "@ngrx/store";
import { RECEIVE_MESSAGE, ReceiveMessage, SET_CHAT_USERNAME, SetChatUsername, LOG_OUT } from "../actions/actions";
import { MyMessage } from "src/app/models/message";

const initialState: MyMessage[] = [];

export default function(state: MyMessage[] = initialState, action: Action) {
    switch(action.type) {
        case RECEIVE_MESSAGE: {
            console.log(action.type);
            const messages = (action as ReceiveMessage).message;
            // console.log({messages});
            return [...state = messages];
        }
        case LOG_OUT:{
            return [...state=[]];
        }
        default: {
            return [...state];
        }

        
    }    
}
