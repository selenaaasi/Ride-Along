import { Action } from "@ngrx/store";
import { FIND_RIDES,FindRides,FIND_RIDES_SUCCESS,FindRidesSuccess} from "../actions/actions";

const initialState= [];

export default function (state:string[] = initialState, action: Action) {
    switch (action.type) {
        
         case  FIND_RIDES_SUCCESS:{
             console.log(action.type);
             const allRides = (action as FindRidesSuccess).rides;
             console.log(allRides);
             let users=allRides[1];
             console.log("USERII");
             console.log(users);
             console.log(state);
             return [...state=[],...users];


        }
        default: {
            return [...state]
        }
    }
}
