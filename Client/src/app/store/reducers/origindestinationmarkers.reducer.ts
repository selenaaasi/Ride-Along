import { Marker } from "src/app/models/marker";
import { Action } from "@ngrx/store";
import { QUICK_RIDE_ORIGIN_SELECTED, QUICK_RIDE_DESTINATION_SELECTED, QUICK_RIDE_ORIGIN_CLEARED, QUICK_RIDE_DESTINATION_CLEARED, QuickRideOriginSelected, QuickRideDestinationSelected, QuickRideOriginCleared, QuickRideDestinationCleared, LOG_OUT } from "../actions/actions";

const initialState:Marker[]=[];
export default function(state:Marker[]=initialState,action:Action){
    switch (action.type){
        case QUICK_RIDE_ORIGIN_SELECTED :{
            const markerorigin=(action as QuickRideOriginSelected).markerorigin;
            return [...state, markerorigin];
        }
        case QUICK_RIDE_DESTINATION_SELECTED:{
            
            const markerdestination=(action as QuickRideDestinationSelected).markerdestnation;
            return [...state,markerdestination];
        }
        case QUICK_RIDE_ORIGIN_CLEARED:{
            const markeroriginfordelete=(action as QuickRideOriginCleared).markerorigin;
            return state.filter(marker=>marker.icon!==markeroriginfordelete.icon)
        }
        case QUICK_RIDE_DESTINATION_CLEARED:{
            const markerdestinationfordelete=(action as QuickRideDestinationCleared).markerdestnation;
            return state.filter(marker=>marker.icon!==markerdestinationfordelete.icon);
          
        }
        case LOG_OUT:{
            return [...state=[]];
        }
    }
}


