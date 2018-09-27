import { ContentBlockBackend, ContentBlock } from './content-block';
import { IEntity } from './interfaces/iEntity';
import { TimeTrack } from '../common/time-track';
import { isNullOrUndefined } from 'util';

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

    public static blocksInRow(block: BaseBioBlock): ContentBlock[] {
        if (isNullOrUndefined(block.contentBlocks) || block.contentBlocks.length === 0) {
            return null;
        }
        let result: ContentBlock[] = [].concat(block.contentBlocks);
        block.contentBlocks.forEach(b => {
           result = result.concat(ContentBlock.inRow(b));
        });
        return result;
    }
}
