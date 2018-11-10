import { DateText } from './content-entities/date-text';
import { ContentText } from './content-entities/content-text';
import { IEntity } from './interfaces/iEntity';
import { ContentType } from './enums/content-type';
import { TimeTrack } from '../common/time-track';
import { Photo } from './content-entities/photo';
import { Video } from './content-entities/video';
import { Publication } from './content-entities/publication';
import { isNullOrUndefined } from 'util';

abstract class AbstractContentBlock {
    id: number;
    isDeleted: boolean;
    title: string;
    subtitle: string;
    type: ContentType;
    comment: string;
    order: string;

    constructor(block: AbstractContentBlock) {
        this.id = block.id;
        this.isDeleted = block.isDeleted;
        this.title = block.title;
        this.subtitle = block.subtitle;
        this.type = block.type;
        this.comment = block.comment;
        this.order = block.order;
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
    parentId = -1;

    constructor(
        contentBlock: AbstractContentBlock,
        baseBlockId: number,
        content: ContentTypes = new ContentText,
        subBlocks: ContentBlock[] = [],
        parentId = -1
    ) {
        super(contentBlock);
        this.baseBlockId = baseBlockId;
        this.content = content;
        this.subBlocks = subBlocks ?  subBlocks.sort((a, b) => ContentBlock.comparer(a, b)) : subBlocks;
        this.parentId = parentId;
    }

    public static inRow(block: ContentBlock): ContentBlock[] {
        if (isNullOrUndefined(block.subBlocks) || block.subBlocks.length === 0) {
            return null;
        }
        let result: ContentBlock[] = [].concat(block.subBlocks);
        block.subBlocks.forEach(b => {
            result = result.concat(ContentBlock.inRow(b));
        });
        return result;
    }

    public static comparer(a: ContentBlock, b: ContentBlock) {
        if (a.order > b.order) {
            return 1;
        }
        if (a.order < b.order) {
            return -1;
        }
    }
}

