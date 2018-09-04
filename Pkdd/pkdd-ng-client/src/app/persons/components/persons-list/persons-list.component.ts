import { Person } from './../../../models/entities/person';
import { RepositoryService } from './../../../core/services/repository.service';
import { Component, OnInit } from '@angular/core';
import { ContentBlock } from '../../../models/entities/content-block';

@Component({
  selector: 'pkdd-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {

  public persons: Person[];
  public blocks: ContentBlock[];

  constructor(
    public repository: RepositoryService
  ) { }

  ngOnInit() {
    this.repository.getPersons().then((value) => {
      this.persons = value;
      this.repository.getContentBlock(this.persons[0].bioBlock.id).then(v => {
        this.blocks = v;
      });
    });
  }

}
