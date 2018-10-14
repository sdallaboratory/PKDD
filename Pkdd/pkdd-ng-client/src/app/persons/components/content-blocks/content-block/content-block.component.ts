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

  public get isVideoContainer() {
    return this.contentBlock.type === ContentType.VideoContainer;
  }

  public get isPhotoContainer() {
    return this.contentBlock.type === ContentType.PhotoContainer;
  }

  public readonly contentTypes = types;

  public get isContainer() {
    return this.contentBlock.type === ContentType.Container
      || this.contentBlock.type === ContentType.VideoContainer
      || this.contentBlock.type === ContentType.PhotoContainer;
  }

  public get isTopBlock() {
    return this.contentBlock.order.split('/').length <= 2;
  }

  constructor(
    private readonly storage: ServerDataStorageService,
    private readonly factory: EntitiesFactoryService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  public async onBlockAdd() {
    const newBlock = this.factory.createNewContentBlock(
      `${this.contentBlock.order}${this.contentBlock.subBlocks.length}/`,
      this.contentBlock.baseBlockId, this.contentBlock.id);
    this.storage.addContentBlock(this.contentBlock.baseBlockId, newBlock, this.contentBlock.id);
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
      this.contentBlock.content =  new Photo();
    }
    if (this.contentBlock.type === ContentType.Video) {
      this.contentBlock.content =  new Video();
    }
    if (this.contentBlock.type === ContentType.Publications) {
      this.contentBlock.content = new Publication();
    }
    if (this.contentBlock.type === ContentType.Container
      || this.contentBlock.type === ContentType.VideoContainer
      || this.contentBlock.type === ContentType.PhotoContainer) {
        this.contentBlock.content = null;
    }
  }
}
