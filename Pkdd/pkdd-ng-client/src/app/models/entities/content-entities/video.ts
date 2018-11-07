import { IMedia } from '../interfaces/media';

export class Video {
    content: IMedia;

    constructor() {
        this.content = {
            url: '',
            description: ''
        };
    }
}
