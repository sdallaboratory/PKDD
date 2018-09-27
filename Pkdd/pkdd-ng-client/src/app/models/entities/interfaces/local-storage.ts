import { ContentBlock } from './../content-block';
import { Person } from '../person';
import { ICachedEntity } from '../../core/cached-entity';

export interface ILocalStorage {
    isValid();

    getPersons(): ICachedEntity<Person>[];
    getPerson(id: number): ICachedEntity<Person>;
    getContentBlocks(bioBlockId: number): ContentBlock[];

    getAveragePersonsCacheTime(): number | null;
    getPersonCacheTime(id: number): number | null;
    getContentBlocksCacheTime(bioBlockId: number): number | null;

    addPersons(persons: Person[]);
    addContentBlocks(bioBlockId: number, blocks: ContentBlock[], parentId: number | null);

    clearStorage(): void;
    clearPersons(): void;
    clearContentBlocks(): void;

    saveAll(): void;
    savePersons(): void;
    saveContentBlocks(): void;

    deletePersons(ids: number[] | Person[]): boolean;
    deleteContentBlocks(bioBlockId: number, ids: number[] | ContentBlock[]): boolean;
}
