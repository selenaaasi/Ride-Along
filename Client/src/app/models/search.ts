import {Data} from "./data";
export class Search {
    constructor(
      
        public  data:Data,
        public origin:string,
        public destination:string,
        public user:string
    ) {

    }
}