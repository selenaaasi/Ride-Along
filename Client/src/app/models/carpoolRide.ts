import {Data} from "./data";
import {Time} from "./time";
export class CarpoolRide {
    constructor(
      
        public data: Data,
        public time: Time,
        public origin:string,
        public seats: number,
        public destination:string,
        public stops:string[],
        public user:string,
    ) {

    }
}