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

  public createPerson(person: PersonBackend): Person {
    if (isNullOrUndefined(person)) {
      throw new Error('Empty person');
    }
    const bioBlock = this.createBaseBioBlock(person.bioBlock);
    const newPerson = new Person(person, bioBlock);
    return newPerson;
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

  public createPersonBackend(person: Person): PersonBackend {
    if (isNullOrUndefined(person)) {
      throw new Error('Empty person');
    }
    const bioBlock = this.createBaseBioBlockBackEnd(person.bioBlock);
    const newPerson = new PersonBackend(person, bioBlock);
    return newPerson;
  }

  public createBaseBioBlockBackEnd(bioBlock: BaseBioBlock): BaseBioBlockBackend {
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
