import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/entities/person';
import { ContentBlock } from '../../../models/entities/content-block';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pkdd-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit {

  public person: Person;
  public contentBlocks: ContentBlock[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const data = (await this.route.data.pipe(first()).toPromise())['personModel'];
    this.person = data.person;
    this.contentBlocks = data.contentBlocks;
  }

  public mainImage() {
    if (!this.person) {
      return '';
    }
    if (this.person.photoUrl === '') {
      return `http://honefoss-vaktselskap.no/wp-content/uploads/2012/07/4ibKz78KT.gif`;
    }
    return `${this.person.photoUrl}`;
  }

}
