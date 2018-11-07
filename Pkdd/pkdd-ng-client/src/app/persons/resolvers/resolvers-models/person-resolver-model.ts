import { ContentBlock } from '../../../models/entities/content-block';
import { Person } from '../../../models/entities/person';

export interface PersonResolverModel {
    person: Person;
    contentBlocks: ContentBlock[];
}
