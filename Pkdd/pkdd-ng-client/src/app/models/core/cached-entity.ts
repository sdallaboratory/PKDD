import { IEntity } from './../entities/interfaces/iEntity';

export class CachedEntity<TEntity, TKey> {
    entity: TEntity;
    cacheId: TKey;

    constructor(entity: TEntity, id: TKey) {
        this.entity = entity;
        this.cacheId = id;
    }
}
