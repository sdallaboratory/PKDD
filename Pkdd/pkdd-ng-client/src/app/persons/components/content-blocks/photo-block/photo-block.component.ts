import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../../../models/entities/content-entities/photo';
import { IMedia } from '../../../../models/entities/interfaces/media';

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

  private mock: IMedia = {
    url: '',
    description: ''
  };
  public selectedPhoto: IMedia;

  public get isSelectedPhotoMock() {
    return this.selectedPhoto === this.mock;
  }

  constructor() {
  }

  public onSelect(item: IMedia) {
    if (this.content.content.includes(item)) {
      this.selectedPhoto = item;
    }
  }

  public onAdd() {
    const newItem = {
      url: '',
      description: ''
    };
    this.content.content.push(newItem);
    this.onSelect(newItem);
  }

  public onDelete() {
    if (this.content.content.includes(this.selectedPhoto)) {
      this.content.content.splice(this.content.content.findIndex(
        c => c.url === this.selectedPhoto.url && c.description === this.selectedPhoto.description), 1);
      this.selectedPhoto = this.mock;
    }
  }

  ngOnInit() {
    this.selectedPhoto = this.mock;
  }

}
