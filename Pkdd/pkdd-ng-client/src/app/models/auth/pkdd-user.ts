import { TimeTrack } from '../common/time-track';

export class Pkdduser {
    constructor(
        public id: number,
        public email: string,
        public name: string,
        public isConfirmed: boolean,
        public isBanned: boolean,
        public timeTrack: TimeTrack,
        public isDeleted: boolean,
    ) { }
}
