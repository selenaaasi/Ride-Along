//// imports////
import { Marker } from "src/app/models/marker";
import { Action } from "@ngrx/store";
import { QUICK_RIDE_CREATED, QUICK_RIDE_LIST_RECEIVED, QuickRideListReceived, DELETE_QUICKRIDE, DeleteQuckRide, DELETE_QUICKRIDE_ANSWER, DeleteQuickRideAnswer, LOG_OUT } from "../actions/actions";
//// constants////
const iconorigin='http://www.googlemapsmarkers.com/v1/A/';
const icondestination='http://www.googlemapsmarkers.com/v1/B/';

const initialState:Marker[]=[];
export default function (state:Marker[]=initialState,action:Action){
    switch(action.type){
        case QUICK_RIDE_CREATED:{
            console.log("U QUICKRIDE MARKER REDUCERU SAM");
            let markerorigin=new Marker(43.324722,21.903333,'http://www.googlemapsmarkers.com/v1/A/00FF00/','Aleksa');
            let markerdestination=new Marker(44.80401,20.46513,'http://www.googlemapsmarkers.com/v1/B/00FF00/','Aleksa');

            return [...state, markerorigin,markerdestination];
        }
        case QUICK_RIDE_LIST_RECEIVED:{
            const markersfromdb = (action as QuickRideListReceived).quickridelist;
            let newmarkers:Marker[]=[];
            markersfromdb.forEach(function (element) {
                newmarkers.push(new Marker(element.originlat,element.originlng,iconorigin+element.color+'/',element.username));
                newmarkers.push(new Marker(element.destinationlat,element.destinationlng,icondestination+element.color+'/',element.username));

              });        
            return [...state=[],...newmarkers];
        }
        case DELETE_QUICKRIDE_ANSWER:{
            state=[];
            const markersfromdb = (action as DeleteQuickRideAnswer).quickridelist;
            console.log("MARKERS FROM DB");
            console.log(markersfromdb);
            let newmarkers:Marker[]=[];
            markersfromdb.forEach(function (element) {
                newmarkers.push(new Marker(element.originlat,element.originlng,iconorigin+element.color+'/',element.username));
                newmarkers.push(new Marker(element.destinationlat,element.destinationlng,icondestination+element.color+'/',element.username));

              });        
            console.log("DELETE MARKERS");
            console.log([...state,...newmarkers]);
            return [...state,...newmarkers];
        }
        case LOG_OUT:{
            return [...state=[]];
        }
        default:
        {
            return[...state];
        }
    }
}

