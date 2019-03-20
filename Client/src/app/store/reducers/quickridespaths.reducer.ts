import { QuickRidePath } from "../../models/quickridepath";
import { Action } from "@ngrx/store";
import { QUICK_RIDE_CREATED,QuickRideCreated, QUICK_RIDE_LIST_RECEIVED, QuickRideListReceived, DELETE_QUICKRIDE, DeleteQuckRide, DELETE_QUICKRIDE_ANSWER, DeleteQuickRideAnswer, LOG_OUT } from "../actions/actions";

const initialState:QuickRidePath[] = [];
export default function(state:QuickRidePath[]=initialState,action:Action){
    switch (action.type){
        case QUICK_RIDE_CREATED:{
            const quickride=(action as QuickRideCreated).quickride;
            const renderoptions={
                   suppressMarkers:true,
                   polylineOptions: { strokeColor: '#00ff00' }
                 };
              const brzavoznjapath=new QuickRidePath(43.324722,21.903333,44.80401,20.46513,renderoptions);
              console.log(brzavoznjapath);

              return [...state, brzavoznjapath];

        }
        case QUICK_RIDE_LIST_RECEIVED:{
            const pathsfromdb = (action as QuickRideListReceived).quickridelist;
            let temp:QuickRidePath[]=[];
            pathsfromdb.forEach(function (element) {
                let renderoptions={
                    suppressMarkers:true,
                    polylineOptions: { strokeColor: '#'+ element.color }
                  };
                  temp.push(new QuickRidePath(element.originlat,element.originlng,element.destinationlat,element.destinationlng,renderoptions));
  
                });
               return [...state=[],...temp];
        }
        case DELETE_QUICKRIDE_ANSWER:{
            const pathsfromdb = (action as DeleteQuickRideAnswer).quickridelist;
             console.log("DOBAR SAM");
             console.log(pathsfromdb);
            let temp:QuickRidePath[]=[];
            pathsfromdb.forEach(function (element) {
                let renderoptions={
                    suppressMarkers:true,
                    polylineOptions: { strokeColor: '#'+ element.color }
                  };
                  temp.push(new QuickRidePath(element.originlat,element.originlng,element.destinationlat,element.destinationlng,renderoptions));
                });
                console.log([...state,...temp]);
                return [...state=[],...temp];
        }
        case LOG_OUT:{
            return [...state=[]];
        }
        default:
        {
            console.log("U DEFAULT PATH SAM");
            return[...state=[]];
        }
    }
}
 
