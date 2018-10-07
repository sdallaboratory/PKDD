import { PkddUser } from '../../models/auth/pkdd-user';

export class UserCreateModel extends PkddUser {
    constructor(
        public password: string,
        id,
        email,
        name,
        roles,
        isConf,
        isBanned,
        timeTrack,
        isDeleted
    ) {
        super(id, email, name, roles, isConf, isBanned, timeTrack, isDeleted);
    }
}
