import { ContentBlockBackend, ContentBlock } from './content-block';
import { IEntity } from './interfaces/iEntity';
import { TimeTrack } from '../common/time-track';

abstract class AbstractBaseBioBlock implements IEntity {
    id: number;
    isDeleted: boolean;
    timeTrack: TimeTrack;
    personId: number;

    constructor(bioBlock: AbstractBaseBioBlock) {
        this.id = bioBlock.id;
        this.isDeleted = bioBlock.isDeleted;
        this.timeTrack = bioBlock.timeTrack;
        this.personId = bioBlock.personId;
    }
}

export class BaseBioBlockBackend extends AbstractBaseBioBlock {
    contentBlocks: ContentBlockBackend[];

    constructor(bioBlock: AbstractBaseBioBlock, contentBlocks: ContentBlockBackend[]) {
        super(bioBlock);
        this.contentBlocks = contentBlocks;
    }
}

export class BaseBioBlock extends AbstractBaseBioBlock {
    contentBlocks: ContentBlock[];

    constructor(bioBlock: AbstractBaseBioBlock, contentBlocks: ContentBlock[]) {
        super(bioBlock);
        this.contentBlocks = contentBlocks;
    }
}
