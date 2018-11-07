import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../../models/entities/person';
import { ServerDataStorageService } from '../../../core/services/server-data-storage.service';
import { ConfirmService } from '../../../core/services/confirm.service';

@Component({
  selector: 'pkdd-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements OnInit {

  @Input()
  public person: Person;

  constructor(
    private readonly storage: ServerDataStorageService,
    private readonly confirmer: ConfirmService
  ) { }

  ngOnInit() {
  }

  public async onDelete() {
    const shouldDelete = await this.confirmer.confirm('Удалить её навсегдааа...');
    if (shouldDelete) {
      this.storage.deletePerson(this.person.id);
    }
  }

  public backgroundImage() {
    if (this.person.photoUrl === '') {
      return `url(http://honefoss-vaktselskap.no/wp-content/uploads/2012/07/4ibKz78KT.gif)`;
    }
    return `url(${this.person.photoUrl})`;
  }
}
