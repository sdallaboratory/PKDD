import { Video } from './../../../../models/entities/content-entities/video';
import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
