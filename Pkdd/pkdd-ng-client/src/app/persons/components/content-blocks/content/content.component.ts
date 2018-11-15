import { ContentTypes } from './../../../../models/entities/content-block';
import { Component, OnInit, Input } from '@angular/core';
import { ContentType } from '../../../../models/entities/enums/content-type';

@Component({
    selector: 'pkdd-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    @Input()
    public type: ContentType;

    @Input()
    public content: ContentTypes;

    @Input()
    public edit: boolean;

    public get isText() {
        return this.type === ContentType.Text;
    }

    public get isDateText() {
        return this.type === ContentType.DateText;
    }

    public get isVideo() {
        return this.type === ContentType.Video;
    }

    public get isPhoto() {
        return this.type === ContentType.Photo;
    }

    public get isPublication() {
        return this.type === ContentType.Publications;
    }

    constructor() { }

    ngOnInit() {
    }

}
