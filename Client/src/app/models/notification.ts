import { CarpoolRide } from "./carpoolRide";

export class MyNotification {
    constructor(
        public senderUsername: string,
        public reciverUsername: string,
        public stopName: string,
        public date: string,
        public approve: boolean = false,
        public seen: boolean = false
        // public ride: CarpoolRide
    ) {}
}
