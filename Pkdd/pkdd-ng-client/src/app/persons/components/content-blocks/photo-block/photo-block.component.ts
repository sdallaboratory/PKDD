import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../../../models/entities/content-entities/photo';

@Component({
  selector: 'pkdd-photo-block',
  templateUrl: './photo-block.component.html',
  styleUrls: ['./photo-block.component.scss']
})
export class PhotoBlockComponent implements OnInit {

  @Input()
  public content: Photo;

  @Input()
  public edit: boolean;

  constructor() { }

  ngOnInit() {
  }

}
