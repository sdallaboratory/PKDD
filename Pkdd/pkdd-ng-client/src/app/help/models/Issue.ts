import { IssueUserInfo } from './issue-user-info';
import { Answer } from './answer';
import { IEntity } from 'src/app/models/entities/interfaces/iEntity';
import { TimeTrack } from 'src/app/models/common/time-track';
import { PkddUser } from 'src/app/models/auth/pkdd-user';

export enum IssueType {
    Improvement = 0,
    Error = 1,
    Comment = 2,
    Question = 3
}
export class Issue implements IEntity {
    id: number;
    isDeleted = false;
    timeTrack: TimeTrack = new TimeTrack(new Date(), new Date(), new Date());
    answers: Answer[] = [];
    user: IssueUserInfo;
    isSolved = false;
    question = '';
    title = '';
    type: IssueType = IssueType.Improvement;
    constructor(user: PkddUser) {
        this.user = new IssueUserInfo(user);
        this.id = 0;
    }
}


