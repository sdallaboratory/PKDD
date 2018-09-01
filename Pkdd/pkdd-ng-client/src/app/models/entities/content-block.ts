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
}

export class ContentBlockBackend extends AbstractContentBlock {
    content: string;
    subBlock: ContentBlockBackend[];
}

export class ContentBlock extends AbstractContentBlock {
    baseBlockId: number;
    content: ContentText | DateText | Photo | Video | Publication;
    subBlock: ContentBlock[];
}

