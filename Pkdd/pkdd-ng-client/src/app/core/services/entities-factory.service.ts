import { ContentText } from './../../models/entities/content-entities/content-text';
import { isNullOrUndefined } from 'util';
import { ContentBlockBackend, ContentBlock, ContentTypes } from './../../models/entities/content-block';
import { BaseBioBlockBackend, BaseBioBlock } from './../../models/entities/base-bio-block';
import { Injectable } from '@angular/core';
import { PersonBackend, Person } from '../../models/entities/person';
import { DateText } from '../../models/entities/content-entities/date-text';
import { Video } from '../../models/entities/content-entities/video';
import { Publication } from '../../models/entities/content-entities/publication';
import { Photo } from '../../models/entities/content-entities/photo';
import { TimeTrack } from '../../models/common/time-track';
import { Sexes } from '../../models/entities/enums/sexes';
import { ContentType } from '../../models/entities/enums/content-type';

@Injectable({
  providedIn: 'root'
})
export class EntitiesFactoryService {

  constructor() { }

  public createPersons(persons: PersonBackend[]): Person[] {
    if (isNullOrUndefined(persons)) {
      throw new Error('Empty person');
    }
    const newPersons = [];
    persons.forEach(p => {
      newPersons.push(this.createPerson(p));
    });
    return newPersons;
  }

  public createPerson(person: PersonBackend): Person {
    if (isNullOrUndefined(person)) {
      throw new Error('Empty person');
    }
    const bioBlock = !isNullOrUndefined(person.bioBlock) ? this.createBaseBioBlock(person.bioBlock) : null;
    const newPerson = new Person(person, bioBlock);
    return newPerson;
  }

  public createBaseBioBlocks(bioBlocks: BaseBioBlockBackend[]): BaseBioBlock[] {
    const newBioBlocks = [];
    bioBlocks.forEach(b => {
      newBioBlocks.push(this.createBaseBioBlock(b));
    });
    return newBioBlocks;
  }

  public createBaseBioBlock(bioBlock: BaseBioBlockBackend): BaseBioBlock {
    if (isNullOrUndefined(bioBlock)) {
      throw new Error('Empty bio block!');
    }
    if (isNullOrUndefined(bioBlock.contentBlocks) || bioBlock.contentBlocks.length === 0) {
      return new BaseBioBlock(bioBlock, null);
    }
    const subBlocks: ContentBlock[] = [];
    bioBlock.contentBlocks.forEach(b => {
      subBlocks.push(this.createContentBlock(bioBlock.id, b));
    });
    const baseBioBlock = new BaseBioBlock(bioBlock, subBlocks);
    return baseBioBlock;
  }

  public createContentBlocks(mainBlockId: number, blocks: ContentBlockBackend[]): ContentBlock[] {
    const newBlocks = [];
    if (isNullOrUndefined(blocks)) {
      return null;
    }
    blocks.forEach(b => {
      newBlocks.push(this.createContentBlock(mainBlockId, b));
    });
    return newBlocks;
  }

  public createContentBlock(mainBlockId: number, block: ContentBlockBackend, parentId = -1): ContentBlock {
    if (isNullOrUndefined(block)) {
      throw new Error('Empty block!');
    }
    const content = this.createBlockContent(block);
    const subBlocks: ContentBlock[] = [];
    block.subBlocks.forEach(b => {
      subBlocks.push(this.createContentBlock(mainBlockId, b, block.id));
    });
    const newBlock = new ContentBlock(block, mainBlockId, content, subBlocks, parentId);
    return newBlock;
  }

  public createBlockContent(block: ContentBlockBackend): ContentTypes {
    if (isNullOrUndefined(block)) {
      throw new Error('Empty block!');
    }
    try {
      const content = JSON.parse(block.content);
      if (content instanceof ContentText
        || content instanceof DateText
        || content instanceof Video
        || content instanceof Photo
        || content instanceof Publication) {
        return content;
      }
    } catch (error) {

    }
    return null;
  }




  public createPersonsBackend(persons: Person[]): PersonBackend[] {
    if (isNullOrUndefined(persons)) {
      throw new Error('Empty person');
    }
    const newPersons = [];
    persons.forEach(p => {
      newPersons.push(this.createPersonBackend(p));
    });
    return newPersons;
  }

  public createPersonBackend(person: Person): PersonBackend {
    if (isNullOrUndefined(person)) {
      throw new Error('Empty person');
    }
    const bioBlock = !isNullOrUndefined(person.bioBlock) ? this.createBaseBioBlockBackend(person.bioBlock) : null;
    const newPerson = new PersonBackend(person, bioBlock);
    return newPerson;
  }

  public createBaseBioBlocksBackend(bioBlocks: BaseBioBlock[]): BaseBioBlockBackend[] {
    const newBioBlocks = [];
    bioBlocks.forEach(b => {
      newBioBlocks.push(this.createBaseBioBlockBackend(b));
    });
    return newBioBlocks;
  }

  public createBaseBioBlockBackend(bioBlock: BaseBioBlock): BaseBioBlockBackend {
    if (isNullOrUndefined(bioBlock)) {
      throw new Error('Empty bio block!');
    }
    if (isNullOrUndefined(bioBlock.contentBlocks) || bioBlock.contentBlocks.length === 0) {
      return new BaseBioBlockBackend(bioBlock, null);
    }
    const subBlocks: ContentBlockBackend[] = [];
    bioBlock.contentBlocks.forEach(b => {
      subBlocks.push(this.createContentBlockBackend(b));
    });
    const baseBioBlock = new BaseBioBlockBackend(bioBlock, subBlocks);
    return baseBioBlock;
  }

  public createContentBlocksBackend(blocks: ContentBlock[]): ContentBlockBackend[] {
    const newBlocks = [];
    if (isNullOrUndefined(blocks)) {
      return null;
    }
    blocks.forEach(b => {
      newBlocks.push(this.createContentBlockBackend(b));
    });
    return newBlocks;
  }

  public createContentBlockBackend(block: ContentBlock): ContentBlockBackend {
    if (isNullOrUndefined(block)) {
      throw new Error('Empty block!');
    }
    const content = !isNullOrUndefined(block.content) ? JSON.stringify(block.content) : '';
    const subBlocks: ContentBlockBackend[] = [];
    block.subBlocks.forEach(b => {
      subBlocks.push(this.createContentBlockBackend(b));
    });
    const newBlock = new ContentBlockBackend(block, content, subBlocks);
    return newBlock;
  }

  public createNewPerson(): Person {
    const id = 0;
    const abstractPerson = {
      id: id,
      isDeleted: false,
      timeTrack: new TimeTrack(new Date(), new Date(), new Date()),
      name: `Новая персона ${id}`,
      sex: Sexes.Undefined,
      birthday: new Date(),
      position: 'Неопределена',
    };
    const baseBioBlock = new BaseBioBlock({
      id: 0,
      isDeleted: false,
      timeTrack: new TimeTrack(new Date(), new Date(), new Date),
      personId: id
    }, []);
    return new Person(abstractPerson, baseBioBlock);
  }

  public createNewContentBlock(order: string = '', baseBioBlockId: number, parentId: number = -1): ContentBlock {
    return new ContentBlock({
      id: 0,
      isDeleted: false,
      timeTrack: new TimeTrack(new Date(), new Date(), new Date()),
      title: 'Заголовок',
      subtitle: 'Подзаголовок',
      type: ContentType.Container,
      comment: 'Некоторый важный комментарий',
      order: order
    }, baseBioBlockId, null, [], parentId);
  }
}
