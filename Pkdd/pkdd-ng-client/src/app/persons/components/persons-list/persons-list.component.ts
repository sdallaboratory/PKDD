import { Person } from './../../../models/entities/person';
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
  ) { }

  ngOnInit() {
  }

}
