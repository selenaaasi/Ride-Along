import{CarpoolRide}from "src/app/models/carpoolRide";
import { Action } from "@ngrx/store";
import { AddRide,ADD_RIDE,ADD_RIDE_SUCCESSFULL,AddRideSuccess, GET_MY_RIDES,GetMyRides} from "../actions/actions";

const initialState= [];

export default function (state: CarpoolRide[] = initialState, action: Action) {
    switch (action.type) {
        
        case ADD_RIDE:{
            console.log(state);
             console.log("U ADD_RIDE!!!!!!!!");
              const carpoolride=(action as AddRide).carpoolRide;
              
              console.log(carpoolride);
              return [...state , carpoolride];  
        }
    
        case ADD_RIDE_SUCCESSFULL:{
            console.log(action.type);
            const user = (action as AddRideSuccess);
            const success = (action as AddRideSuccess).success;
            console.log("Ovo je state"+state);
            return [...state ];

        }
         case  GET_MY_RIDES:{
             console.log(action.type);
             const myRides = (action as GetMyRides).myRides;
             console.log(myRides);
             if(myRides.length < 1)
                return [...state];
             return [...state,...myRides];


        }
        default: {
            return state
        }
    }
}
