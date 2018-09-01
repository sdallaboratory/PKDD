import { ContentBlockBackend } from './content-block';
import { IEntity } from './interfaces/iEntity';
import { TimeTrack } from '../common/time-track';

abstract class AbstactBaseBioBlock implements IEntity {
    id: number;
    isDeleted: boolean;
    timeTrack: TimeTrack;
    personId: number;
}

export class BaseBioBlockBackend extends AbstactBaseBioBlock {
    contentBlocks: ContentBlockBackend[];
}

export class BaseBioBlock extends AbstactBaseBioBlock {
    contentBlocks: ContentBlockBackend[];
}
