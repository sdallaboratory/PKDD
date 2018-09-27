import { IMedia } from '../interfaces/media';

export class Publication implements IMedia {
    name: string;
    url: string;
    description: string;
}
