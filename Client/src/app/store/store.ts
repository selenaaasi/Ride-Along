import { User } from "../models/user";
import {Marker} from '../models/marker';
import {QuickRidePath} from "../models/quickridepath";

export * from './effects/effects';

import { ActionReducerMap } from "@ngrx/store";
import userReducer from "./reducers/user.reducer";
import quickridespathReducer from "./reducers/quickridespaths.reducer";
import quickridesmarkersReducer from "./reducers/quickridemarkers.reducer";
import origindestinationmarkersReducer from "./reducers/origindestinationmarkers.reducer";
import messagesReducer from "./reducers/messages.reducer";
import { MyMessage } from "../models/message";
import chatReducer from "./reducers/chat.reducer";
import { MyNotification } from "../models/notification";
import notificationsReducer from "./reducers/notifications.reducer";
import userlistReducer from "./reducers/userlist.reducer";
import carpoolrideReducer from "./reducers/carpoolride.reducer";
import findridesReducer from "./reducers/findrides.reducer";
import { CarpoolRide } from "../models/carpoolRide";
import usersFromService from "./reducers/usersFromService";

export interface State {
    user: User[];
    quickridespath:QuickRidePath[];
    quickridesmarkers:Marker[];
    origindestinationmarkers:Marker[];
    messages: MyMessage[];
    chats: MyMessage[];
    notifiations: MyNotification[];
    userlist:User[];
    carpoolRide:CarpoolRide[];
    findRides:string[][];
    usersFromService:string[]
}


export const rootReducer: ActionReducerMap<any> = {
    user: userReducer,
    quickridespath:quickridespathReducer,
    quickridesmarkers:quickridesmarkersReducer,
    origindestinationmarkers:origindestinationmarkersReducer,
    messages: messagesReducer,
    chats: chatReducer,
    notifiations: notificationsReducer,
    userlist:userlistReducer,
    carpoolRide:carpoolrideReducer,
    findRides:findridesReducer,
    usersFromService:usersFromService
};

