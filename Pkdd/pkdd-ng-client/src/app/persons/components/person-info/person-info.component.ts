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

  public person!: Person;
  public contentBlocks!: ContentBlock[];

  constructor(
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const personModel = this.route.snapshot.data['personModel'];
    this.person = personModel.person;
    this.contentBlocks = personModel.contentBlocks;
  }

}
