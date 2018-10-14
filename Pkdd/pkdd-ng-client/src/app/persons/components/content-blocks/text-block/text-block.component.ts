import { ContentText } from './../../../../models/entities/content-entities/content-text';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pkdd-text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent implements OnInit {

  @Input()
  public content: ContentText;

  @Input()
  public edit: boolean;

  constructor() { }

  ngOnInit() {
  }

}
