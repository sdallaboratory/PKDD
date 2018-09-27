import { IEntity } from './../entities/interfaces/iEntity';
import { TimeTrack } from '../common/time-track';

export class CachedEntity<TEntity> {
    entity: TEntity;
    id: number;
    setTime: Date;

    constructor(entity: TEntity, id: number, setTime: Date) {
        this.entity = entity;
        this.id = id;
        this.setTime = setTime;
    }
}

