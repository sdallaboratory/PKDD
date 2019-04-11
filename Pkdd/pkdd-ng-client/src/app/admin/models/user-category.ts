import { PkddUser } from 'src/app/models/auth/pkdd-user';

export interface UserCategory {
    name: string;
    users: PkddUser[]
}
