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

  async ngOnInit() {
    console.log(this.persons, this.blocks);
    this.persons = await this.repository.getPersons();
    console.log(this.persons, this.blocks);
    this.blocks = await this.repository.getContentBlock(this.persons[0].bioBlock.id);
    console.log(this.persons, this.blocks);
  }

}
