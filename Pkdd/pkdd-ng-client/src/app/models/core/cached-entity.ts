import { IEntity } from './../entities/interfaces/iEntity';
import { TimeTrack } from '../common/time-track';
import { EntityScanner } from '../../core/utils/entity-scanner';

export class CachedEntity<TEntity> implements ICachedEntity<TEntity> {
    entity: TEntity;
    id: number;
    setTime: Date;
    private status: CachedEntityStatus;

    getStatus() {
        return this.status;
    }

    markDeleted() {
        this.status = CachedEntityStatus.Updated;
    }

    markAdded() {
        this.status = CachedEntityStatus.Updated;
    }

    constructor(entity: TEntity, id: number, setTime: Date) {
        this.entity = entity;
        this.id = id;
        this.setTime = setTime;
        this.status = CachedEntityStatus.None;
    }
}

export interface ICachedEntity<TEntity> {
    entity: TEntity;
    id: number;
    setTime: Date;

    getStatus(): CachedEntityStatus;


    markDeleted();
    markAdded();
}

enum CachedEntityStatus {
    Added,
    Deleted,
    Updated,
    None,
}

