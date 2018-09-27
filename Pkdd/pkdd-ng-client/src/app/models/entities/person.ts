import { IEntity } from './interfaces/iEntity';
import { Sexes } from './enums/sexes';
import { TimeTrack } from '../common/time-track';
import { BaseBioBlockBackend, BaseBioBlock } from './base-bio-block';

abstract class AbstractPerson implements IEntity {
    id: number;
    isDeleted: boolean;
    timeTrack: TimeTrack;
    name: string;
    sex: Sexes;
    birthday: Date;
    position: string;

    constructor(person: AbstractPerson) {
        this.id = person.id;
        this.isDeleted = person.isDeleted;
        this.timeTrack = person.timeTrack;
        this.name = person.name;
        this.sex = person.sex;
        this.birthday = person.birthday;
        this.position = person.position;
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
