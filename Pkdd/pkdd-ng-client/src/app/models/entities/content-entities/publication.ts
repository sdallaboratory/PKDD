import { IMedia } from '../interfaces/media';

export class Publication implements IMedia {
    public name: string;
    public url: string;
    public description: string;
}
