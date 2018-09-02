import { ContentBlock } from './../content-block';
import { Person } from '../person';

export interface ILocalStorage {
    isValid();

    getPersons(): Person[];
    getPerson(id: number): Person;
    getContentBlocks(bioBlockId: number): ContentBlock[];

    addPersons(persons: Person[]);
    addContentBlocks(bioBlockId: number, blocks: ContentBlock[]);

    clearStorage(): void;
    clearPersons(): void;
    clearContentBlocks(): void;

    saveAll(): void;
    savePersons(): void;
    saveContentBlocks(): void;

    deletePersons(ids: number[] | Person[]): boolean;
    deleteContentBlocks(bioBlockId: number, ids: number[] | ContentBlock[]): boolean;
}
