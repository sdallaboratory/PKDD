import { IEntity } from './interfaces/iEntity';
import { Sexes } from './enums/sexes';
import { TimeTrack } from '../common/time-track';
import { BaseBioBlockBackend } from './base-bio-block';

export class PersonBackend implements IEntity {
    id: number;
    isDeleted: boolean;
    timeTrack: TimeTrack;
    name: string;
    sex: Sexes;
    birthday: Date;
    position: string;
    bioBlock: BaseBioBlockBackend;
}
