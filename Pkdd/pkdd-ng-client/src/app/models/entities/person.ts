import { IEntity } from './interfaces/iEntity';
import { Sexes } from './enums/sexes';
import { TimeTrack } from '../common/time-track';
import { BaseBioBlockBackend, BaseBioBlock } from './base-bio-block';
import { Priority } from './enums/priority';

abstract class AbstractPerson implements IEntity {

    public id: number;
    public isDeleted: boolean;
    public timeTrack: TimeTrack;
    public name: string;
    public sex: Sexes;
    public birthday: Date;
    public position: string;
    public photoUrl: string;
    public isPublished: boolean;
    public priority: Priority;

    constructor(person: AbstractPerson) {
        this.id = person.id;
        this.isDeleted = person.isDeleted;
        this.timeTrack = person.timeTrack;
        this.name = person.name;
        this.sex = person.sex;
        this.birthday = person.birthday;
        this.position = person.position;
        this.photoUrl = person.photoUrl;
        this.isPublished = person.isPublished;
        this.priority = person.priority;
    }
}

export class PersonBackend extends AbstractPerson {
    bioBlock: BaseBioBlockBackend;

    constructor(person: AbstractPerson, bioBlock: BaseBioBlockBackend) {
        super(person);
        this.bioBlock = bioBlock;
    }
}

export class Person extends AbstractPerson {
    bioBlock: BaseBioBlock;

    constructor(person: AbstractPerson, bioBlock: BaseBioBlock) {
        super(person);
        this.bioBlock = bioBlock;
    }
}
