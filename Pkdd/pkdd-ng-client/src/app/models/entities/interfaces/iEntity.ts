import { TimeTrack } from './../../common/time-track';

export interface IEntity {
    id: number;
    isDeleted: boolean;
    timeTrack: TimeTrack;
}
