import { ActivatedRoute } from '@angular/router';
import { PersonResolverModel } from './../../resolvers/resolvers-models/person-resolver-model';
import { ContentBlock } from './../../../models/entities/content-block';
import { Component, OnInit } from '@angular/core';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';
import { Person } from '../../../models/entities/person';
import { first } from 'rxjs/operators';
import { ServerDataStorageService } from '../../../core/services/server-data-storage.service';
import { EntitiesFactoryService } from '../../../core/services/entities-factory.service';

@Component({
  selector: 'pkdd-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  public person: Person;
  public contentBlocks: ContentBlock[];

  constructor(
    private factory: EntitiesFactoryService,
    private route: ActivatedRoute,
    private storage: ServerDataStorageService
  ) { }

  async ngOnInit() {
    const data = (await this.route.data.pipe(first()).toPromise())['personModel'];
    this.person = data.person;
    this.contentBlocks = data.contentBlocks;
  }

  public async onBlockAdd() {
    const newBlock = this.factory.createNewContentBlock(`${this.contentBlocks.length}/`, this.person.bioBlock.id);
    await this.storage.addContentBlock(this.person.bioBlock.id, newBlock);
  }

}
