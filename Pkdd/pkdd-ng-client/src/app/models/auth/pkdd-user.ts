import { TimeTrack } from '../common/time-track';
import { PkddRoles } from './pkdd-roles.enum';

export class PkddUser {
    constructor(
        public id: number,
        public email: string,
        public name: string,
        public roles: PkddRoles[],
        public isConfirmed: boolean,
        public isBanned: boolean,
        public timeTrack: TimeTrack,
        public isDeleted: boolean,
    ) { }
}
