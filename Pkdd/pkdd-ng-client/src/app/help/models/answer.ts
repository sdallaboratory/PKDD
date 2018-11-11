import { TimeTrack } from './../../models/common/time-track';
import { IEntity } from './../../models/entities/interfaces/iEntity';
import { IssueUserInfo } from './issue-user-info';
import { PkddUser } from 'src/app/models/auth/pkdd-user';

export class Answer implements IEntity {
    id: number;
    isDeleted = false;
    timeTrack: TimeTrack = new TimeTrack(new Date(), new Date(), new Date());
    issueId: number;
    answerText = '';
    user: IssueUserInfo;
    order: number;
    constructor(user: PkddUser, order: number, issueId: number) {
        this.user = new IssueUserInfo(user);
        this.order = order;
        this.issueId = issueId;
    }
}
