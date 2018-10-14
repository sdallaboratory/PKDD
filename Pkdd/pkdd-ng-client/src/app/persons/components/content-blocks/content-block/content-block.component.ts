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
    return this.edit
      || (this.contentBlock.title !== ''
        && this.contentBlock.subtitle !== '');
  }

  public readonly contentTypes = types;

  public get isContainer() {
    return this.contentBlock.type === ContentType.Container;
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

  public async onBlockAdd() {
    const newBlock = this.factory.createNewContentBlock(
      `${this.contentBlock.order}${this.contentBlock.subBlocks.length}/`,
      this.contentBlock.baseBlockId, this.contentBlock.id);
    this.storage.addContentBlock(this.contentBlock.baseBlockId, newBlock, this.contentBlock.id);
  }

  public async onBlockDelete() {
    await this.storage.deleteContentBlock(this.contentBlock.baseBlockId, this.contentBlock);
  }

  public async onBlockSave() {
    await this.storage.updateContentBlock(this.contentBlock.baseBlockId, this.contentBlock);
  }

  public onTypeChanged() {
    if (this.contentBlock.type === ContentType.Text) {
      this.contentBlock.content = new ContentText();
    }
    if (this.contentBlock.type === ContentType.DateText) {
      this.contentBlock.content = new DateText();
    }
    if (this.contentBlock.type === ContentType.Photo) {
      this.contentBlock.content = new Photo();
    }
    if (this.contentBlock.type === ContentType.Video) {
      this.contentBlock.content = new Video();
    }
    if (this.contentBlock.type === ContentType.Publications) {
      this.contentBlock.content = new Publication();
    }
    if (this.contentBlock.type === ContentType.Container) {
      this.contentBlock.content = null;
    }
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
