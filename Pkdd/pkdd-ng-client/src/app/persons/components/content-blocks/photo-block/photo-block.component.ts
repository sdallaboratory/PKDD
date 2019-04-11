import { Component, Input } from '@angular/core';
import { Photo } from '../../../../models/entities/content-entities/photo';
import { IMedia } from '../../../../models/entities/interfaces/media';
import { remove } from 'src/app/core/utils/remove';
import { ConfirmService } from 'src/app/core/services/confirm.service';

@Component({
  selector: 'pkdd-photo-block',
  templateUrl: './photo-block.component.html',
  styleUrls: ['./photo-block.component.scss']
})
export class PhotoBlockComponent {

  @Input()
  public content!: Photo;

  @Input()
  public edit!: boolean;

  public selectedPhoto: IMedia | null = null;

  constructor(
    private readonly confirmer: ConfirmService
  ) { }

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

  public async onDelete(photo: IMedia) {
    const confirmed = !photo.url
      || photo.url === ''
      || await this.confirmer.confirm(`Вы уверены, что хотите удалить фотографию "${photo.description}"?`);

    if (!confirmed) {
      return;
    }

    if (this.selectedPhoto === photo) {
      this.selectedPhoto = null;
    }
    remove(this.content.content, photo);
  }

}
