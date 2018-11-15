import { Video } from './../../../../models/entities/content-entities/video';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pkdd-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent implements OnInit {

  @Input()
  public content: Video;

  @Input()
  public edit: boolean;

  public url;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.content.content.url.replace('watch?v=', 'embed/'));
  }

  public onUrlChanged() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.content.content.url.replace('watch?v=', 'embed/'));
  }

  public get isValid() {
    return this.content && this.content.content.url && this.content.content.url.includes('youtube');
  }

}
