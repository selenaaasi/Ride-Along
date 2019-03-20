import { User } from "src/app/models/user";
import { Action } from "@ngrx/store";
import { SIGN_UP, SignUp, LOG_IN_SUCCESS, LogInSuccess, GET_USER, CHANGE_NOTIFIACITON, ChangeNotification, LOG_OUT } from "../actions/actions";

const inititalUser = new User('', '', '', '', '', '', -1);
const initialState: User[] = [inititalUser];

export default function(state: User[] = initialState, action: Action) {
    switch(action.type) {
        case GET_USER: {
            console.log(action.type);

            return [...state];
        }
        case LOG_IN_SUCCESS: {
            // console.log(action.type);
            const user = (action as LogInSuccess).user;
            const success = (action as LogInSuccess).success;

            return [...state = [], user];
        }
        case LOG_OUT:{
            return [...state=[]];
        }
        default:{
            // console.log("DEFAULT");
            return [...state];
        }
    }
}
