import { Action } from "@ngrx/store";
import { NEED_UPDATE, DELETE_QUICKRIDE_ANSWER } from "../actions/actions";


const initialState:string[]=[''];
export default function(state:string[]=initialState,action:Action){
    switch (action.type){
        case DELETE_QUICKRIDE_ANSWER:{
            console.log("NEED UPDATE");
            return [...state,''];
        }
        default:{
            return [...state];
        }
    }
}
