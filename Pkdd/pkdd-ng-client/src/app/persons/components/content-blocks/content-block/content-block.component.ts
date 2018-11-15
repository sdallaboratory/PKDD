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
import { WindowService } from 'src/app/core/services/window.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';

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


  public readonly contentTypes = types;

  public get isContainer() {
    return this.contentBlock && this.contentBlock.type === ContentType.Container;
  }

  public get level() {
    return this.contentBlock && this.contentBlock.order.split('/').length;
  }

  public isCollapsedOnMobile = false;

  constructor(
    private readonly storage: ServerDataStorageService,
    private readonly factory: EntitiesFactoryService,
    public readonly window: WindowService,
    private readonly confirmer: ConfirmService,
  ) { }

  ngOnInit() {
    this.isCollapsedOnMobile = this.level && this.level <= 2;
  }

  public async onBlockAdd(type: 'text' | 'dateText' | 'photo' | 'video' | 'public' | 'container') {
    const newBlock = this.factory.createNewContentBlock(
      `${this.contentBlock.order}${this.contentBlock.subBlocks.length}/`,
      this.contentBlock.baseBlockId, this.contentBlock.id);
    const content = this.getTypeAndContent(type);
    newBlock.type = content.type;
    newBlock.content = content.content;
    this.storage.addContentBlock(this.contentBlock.baseBlockId, newBlock, this.contentBlock.id);
  }

  public async onBlockDelete() {
    const confirmed = await this.confirmer.confirm('Вы уверены, что хотите удалить блок со всем его содержимым?');
    if (confirmed) {
      await this.storage.deleteContentBlock(this.contentBlock.baseBlockId, this.contentBlock);
    }
  }

  public async onBlockSave() {
    await this.storage.updateContentBlock(this.contentBlock.baseBlockId, this.contentBlock);
  }

  public contentFromType(type: ContentType) {
    if (type === ContentType.Text) {
      return new ContentText();
    } else if (type === ContentType.DateText) {
      return new DateText();
    } else if (type === ContentType.Photo) {
      return new Photo();
    } else if (type === ContentType.Video) {
      return new Video();
    } else if (type === ContentType.Publications) {
      return new Publication();
    } else if (type === ContentType.Container) {
    }
  }

  private getTypeAndContent(type: 'text' | 'dateText' | 'photo' | 'video' | 'public' | 'container') {
    const contentType = type === 'container' ? ContentType.Container :
      type === 'text' ? ContentType.Text : type === 'dateText' ? ContentType.DateText :
        type === 'photo' ? ContentType.Photo : type === 'video' ? ContentType.Video : ContentType.Publications;
    const content = this.contentFromType(contentType);
    return { type: contentType, content: content };
  }

  public onToggleCollapsed() {
    console.log('toggled');
    this.isCollapsedOnMobile = !this.isCollapsedOnMobile;
  }
}
