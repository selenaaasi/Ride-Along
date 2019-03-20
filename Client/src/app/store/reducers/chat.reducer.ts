import { Action } from "@ngrx/store";
import { RECEIVE_MESSAGE, ReceiveMessage, SET_CHAT_USERNAME, SetChatUsername, LOG_OUT } from "../actions/actions";
import { MyMessage } from "src/app/models/message";

const initialState: MyMessage[] = [new MyMessage('NO MESSAGES','','')];

export default function(state: MyMessage[] = initialState, action: Action) {
    switch(action.type) {
        // case SET_CHAT_USERNAME: {
        //     console.log(action.type);
        //     const newstMessage = (action as SetChatUsername).message;

        //     // return [...state,newstMessage];
        //     return updateChatState(newstMessage,state,initialState);
        // }
        case RECEIVE_MESSAGE: {
            console.log(`chatReducer: ${action.type}`);
            const newestMessages = (action as ReceiveMessage).message;
            console.log({newestMessages}, newestMessages.length);

            if(newestMessages.length < 1) {
                console.log("VRATI STATE NE PROMENJEN");
                return [...state];
            }

            return updateChatState(newestMessages[0],state,initialState);
        }
        case LOG_OUT:{
            return [...state=[]];
        }
        default: {
            return [...state];
        }
        
    }    
}
function updateChatState(newMessage: MyMessage, state, initState) {
    console.log({state},{initialState},{newMessage});
    if(state[0] === initState[0]) {
        console.log("FIRST NEW MESSAGE");
        return [...state = [], newMessage];
    }
    if(newMessage === undefined) {
        console.log("NEWST MESSAGE[0] UNDEFINED");
        return [...state];
    }
    let update = false;
    state = state.map((ms) => {
        if(ms.chatUser === newMessage.chatUser) {
            update = true;
            return newMessage;
        } else {
            return ms;
        }
    });
    if(!update) {
        console.log("NEW MESSAGE FROM FROM NEW USER");
        return [newMessage,...state]; 
    } else {
        console.log("STATE UPDATED");
        return [...state];
    }
}
