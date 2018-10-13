import { ContentBlock } from './../../../../models/entities/content-block';
import { Component, OnInit, Input } from '@angular/core';
import { ContentType, types } from '../../../../models/entities/enums/content-type';
import { ServerDataStorageService } from '../../../../core/services/server-data-storage.service';
import { EntitiesFactoryService } from '../../../../core/services/entities-factory.service';

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
  ) { }

  ngOnInit() {
  }

  public async onBlockAdd() {
    const newBlock = this.factory.createNewContentBlock(
      `${this.contentBlock.order}${this.contentBlock.subBlocks.length}/`,
      this.contentBlock.baseBlockId, this.contentBlock.id);
    console.log(newBlock);
    this.storage.addContentBlock(this.contentBlock.baseBlockId, newBlock, this.contentBlock.id);
  }
}
