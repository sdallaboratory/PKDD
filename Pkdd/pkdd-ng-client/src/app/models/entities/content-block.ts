import { DateText } from './content-entities/date-text';
import { ContentText } from './content-entities/content-text';
import { IEntity } from './interfaces/iEntity';
import { ContentType } from './enums/content-type';
import { TimeTrack } from '../common/time-track';
import { Photo } from './content-entities/photo';
import { Video } from './content-entities/video';
import { Publication } from './content-entities/publication';

abstract class AbstractContentBlock implements IEntity {
    id: number;
    isDeleted: boolean;
    timeTrack: TimeTrack;
    title: string;
    subtitle: string;
    type: ContentType;
    comment: string;

    constructor(block: AbstractContentBlock) {
        this.id = block.id;
        this.isDeleted = block.isDeleted;
        this.timeTrack = block.timeTrack;
        this.title = block.title;
        this.subtitle = block.subtitle;
        this.type = block.type;
        this.comment = block.comment;
    }
}

export class ContentBlockBackend extends AbstractContentBlock {
    content: string;
    subBlocks: ContentBlockBackend[];

    constructor(
        contentBlock: AbstractContentBlock,
        content: string,
        subBlocks: ContentBlockBackend[],
    ) {
        super(contentBlock);
        this.content = content;
        this.subBlocks = subBlocks;
    }
}

export type ContentTypes = ContentText | DateText | Photo | Video | Publication;

export class ContentBlock extends AbstractContentBlock {
    baseBlockId: number;
    content: ContentTypes;
    subBlocks: ContentBlock[];

    constructor(
        contentBlock: AbstractContentBlock,
        baseBlockId: number,
        content: ContentTypes,
        subBlocks: ContentBlock[],
    ) {
        super(contentBlock);
        this.baseBlockId = baseBlockId;
        this.content = content;
        this.subBlocks = subBlocks;
    }
}

