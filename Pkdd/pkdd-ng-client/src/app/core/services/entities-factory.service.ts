import { isNullOrUndefined } from 'util';
import { ContentBlockBackend, ContentBlock, ContentTypes } from './../../models/entities/content-block';
import { BaseBioBlockBackend, BaseBioBlock } from './../../models/entities/base-bio-block';
import { Injectable } from '@angular/core';
import { PersonBackend, Person } from '../../models/entities/person';

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
    const bioBlock = this.createBaseBioBlock(person.bioBlock);
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
    const subBlocks: ContentBlock[] = [];
    bioBlock.contentBlocks.forEach(b => {
      subBlocks.push(this.createContentBlock(bioBlock.id, b));
    });
    const baseBioBlock = new BaseBioBlock(bioBlock, subBlocks);
    return baseBioBlock;
  }

  public createContentBlocks(mainBlockId: number, blocks: ContentBlockBackend[]): ContentBlock[] {
    const newBlocks = [];
    blocks.forEach(b => {
      newBlocks.push(this.createContentBlock(mainBlockId, b));
    });
    return newBlocks;
  }

  public createContentBlock(mainBlockId: number, block: ContentBlockBackend): ContentBlock {
    if (isNullOrUndefined(block)) {
      throw new Error('Empty block!');
    }
    const content = this.createBlockContent(block);
    const subBlocks: ContentBlock[] = [];
    block.subBlocks.forEach(b => {
      subBlocks.push(this.createContentBlock(mainBlockId, b));
    });
    const newBlock = new ContentBlock(block, mainBlockId, content, subBlocks);
    return newBlock;
  }

  public createBlockContent(block: ContentBlockBackend): ContentTypes {
    if (isNullOrUndefined(block)) {
      throw new Error('Empty block!');
    }
    return JSON.parse(block.content) as ContentTypes;
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
    const bioBlock = this.createBaseBioBlockBackend(person.bioBlock);
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
    const subBlocks: ContentBlockBackend[] = [];
    bioBlock.contentBlocks.forEach(b => {
      subBlocks.push(this.createContentBlockBackend(b));
    });
    const baseBioBlock = new BaseBioBlockBackend(bioBlock, subBlocks);
    return baseBioBlock;
  }

  public createContentBlocksBackend(blocks: ContentBlock[]): ContentBlockBackend[] {
    const newBlocks = [];
    blocks.forEach(b => {
      newBlocks.push(this.createContentBlockBackend(b));
    });
    return newBlocks;
  }

  public createContentBlockBackend(block: ContentBlock): ContentBlockBackend {
    if (isNullOrUndefined(block)) {
      throw new Error('Empty block!');
    }
    const content = JSON.stringify(block.content);
    const subBlocks: ContentBlockBackend[] = [];
    block.subBlocks.forEach(b => {
      subBlocks.push(this.createContentBlockBackend(b));
    });
    const newBlock = new ContentBlockBackend(block, content, subBlocks);
    return newBlock;
  }
}
