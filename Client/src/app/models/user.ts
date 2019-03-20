export class User {
    constructor(
        public username: string,
        public surname: string,
        public name: string,
        public password: string,
        public email: string,
        public color: string = '',
        public stars: number = 0,
        public numRides: number = 0
    ) {}
}
