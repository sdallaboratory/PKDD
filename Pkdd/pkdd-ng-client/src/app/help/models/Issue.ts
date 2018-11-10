import { IssueUserInfo } from './issue-user-info';
import { Answer } from './answer';
import { IEntity } from 'src/app/models/entities/interfaces/iEntity';
import { TimeTrack } from 'src/app/models/common/time-track';

export class Issue implements IEntity {
    id: number;
    isDeleted: boolean;
    timeTrack: TimeTrack;
    answers: Answer[];
    user: IssueUserInfo;
    isSolved: boolean;
}

export enum IssueType {
    Improvement,
    Error,
    Comment
}
