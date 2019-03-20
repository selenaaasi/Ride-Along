import { Action } from "@ngrx/store";
import { USERLIST_REQUESTED_ANSWER, UserListRequestedAnswer, EMPTY_USERLIST, LOG_OUT } from "../actions/actions";
import { User } from "src/app/models/user";



const initialState:User[]=[];
export default function(state:User[]=initialState,action:Action){
    switch (action.type){
        case USERLIST_REQUESTED_ANSWER:{
            const newusers = (action as UserListRequestedAnswer).users;
            console.log(newusers);
            return [...state=[],...newusers];
        }
        case EMPTY_USERLIST:{
            console.log("U EMPTY USERLIST!");
            return [...state=[]];
        }
        case LOG_OUT:{
            return [...state=[]];
        }
        default:{
            return [...state];
        }
    }
}
