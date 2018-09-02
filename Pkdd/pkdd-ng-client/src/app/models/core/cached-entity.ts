import { IEntity } from './../entities/interfaces/iEntity';
import { TimeTrack } from '../common/time-track';

export class CachedEntity<TEntity> {
    isDeleted: boolean;
    timeTrack: TimeTrack;
    entity: TEntity;
    id: number;

    constructor(entity: TEntity, id: number) {
        this.entity = entity;
        this.id = id;
    }
}

