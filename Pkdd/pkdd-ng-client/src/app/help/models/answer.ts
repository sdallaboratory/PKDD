import { TimeTrack } from './../../models/common/time-track';
import { IEntity } from './../../models/entities/interfaces/iEntity';
import { IssueUserInfo } from './issue-user-info';

export class Answer implements IEntity {
    id: number;
    isDeleted: boolean;
    timeTrack: TimeTrack;
    issueId: number;
    answerText: string;
    user: IssueUserInfo;
    order: number;
}
