import { Publication } from './../../../../models/entities/content-entities/publication';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pkdd-publication-block',
  templateUrl: './publication-block.component.html',
  styleUrls: ['./publication-block.component.scss']
})
export class PublicationBlockComponent implements OnInit {

  @Input()
  public content: Publication;

  @Input()
  public edit: boolean;

  constructor() { }

  ngOnInit() {
  }

}
