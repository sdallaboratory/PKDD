import { ContentBlock } from './../../../../models/entities/content-block';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ContentType, types } from '../../../../models/entities/enums/content-type';
import { ServerDataStorageService } from '../../../../core/services/server-data-storage.service';
import { EntitiesFactoryService } from '../../../../core/services/entities-factory.service';
import { ContentText } from '../../../../models/entities/content-entities/content-text';
import { DateText } from '../../../../models/entities/content-entities/date-text';
import { Photo } from '../../../../models/entities/content-entities/photo';
import { Video } from '../../../../models/entities/content-entities/video';
import { Publication } from '../../../../models/entities/content-entities/publication';

@Component({
  selector: 'pkdd-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent implements OnInit {

  @Input()
  public contentBlock: ContentBlock;

  @Input()
  public edit: boolean;

  public get needDrawHeader() {
    return this.isContainer && (this.edit || this.contentBlock.title !== '');
    // || this.contentBlock.subtitle !== '');
  }

  public readonly contentTypes = types;

  public get isContainer() {
    return this.contentBlock && this.contentBlock.type === ContentType.Container;
  }

  public get level() {
    return this.contentBlock.order.split('/').length;
  }

  constructor(
    private readonly storage: ServerDataStorageService,
    private readonly factory: EntitiesFactoryService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  public isLevelLessOrEqual(level: number) {
    return this.level <= level;
  }

  public async onBlockAdd(type: 'text' | 'dateText' | 'photo' | 'video' | 'public') {
    const newBlock = this.factory.createNewContentBlock(
      `${this.contentBlock.order}${this.contentBlock.subBlocks.length}/`,
      this.contentBlock.baseBlockId, this.contentBlock.id);
    const content = this.getTypeAndContent(type);
    newBlock.type = content.type;
    newBlock.content = content.content;
    this.storage.addContentBlock(this.contentBlock.baseBlockId, newBlock, this.contentBlock.id);
  }

  public async onBlockDelete() {
    await this.storage.deleteContentBlock(this.contentBlock.baseBlockId, this.contentBlock);
  }

  public async onBlockSave() {
    await this.storage.updateContentBlock(this.contentBlock.baseBlockId, this.contentBlock);
  }

  public contentFromType(type: ContentType) {
    if (type === ContentType.Text) {
      return new ContentText();
    }
    if (type === ContentType.DateText) {
      return new DateText();
    }
    if (type === ContentType.Photo) {
      return new Photo();
    }
    if (type === ContentType.Video) {
      return new Video();
    }
    if (type === ContentType.Publications) {
      return new Publication();
    }
    if (type === ContentType.Container) {
      return null;
    }
  }

  private getTypeAndContent(type: 'text' | 'dateText' | 'photo' | 'video' | 'public') {
    const contentType = type === 'text' ? ContentType.Text : type === 'dateText' ? ContentType.DateText :
      type === 'photo' ? ContentType.Photo : type === 'video' ? ContentType.Video : ContentType.Publications;
    const content = this.contentFromType(contentType);
    return { type: contentType, content: content };
  }

  public countFontSize(isSublitle = false) {
    const baseSize = 24;
    const shrinkSpeed = (this.level / 2);
    const newSize = Math.floor(24 * (isSublitle ? 1.1 : 1.3) / shrinkSpeed);
    return newSize;
  }

  public countYellow() {
    const level = this.level;
    if (level === 1) {
      return 100;
    }
    const red = 255;
    const green = 255;
    const blue = 100 + 30 * level;
    return '#' + `${red.toString(16)}` +
      `${green.toString(16)}` + `${blue.toString(16)}`;
  }

}
