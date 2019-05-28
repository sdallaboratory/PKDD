import { ActivatedRoute, Router } from '@angular/router';
import { PersonResolverModel } from './../../resolvers/resolvers-models/person-resolver-model';
import { ContentBlock } from './../../../models/entities/content-block';
import { Component, OnInit } from '@angular/core';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';
import { Person } from '../../../models/entities/person';
import { first } from 'rxjs/operators';
import { ServerDataStorageService } from '../../../core/services/server-data-storage.service';
import { EntitiesFactoryService } from '../../../core/services/entities-factory.service';
import { Sexes } from '../../../models/entities/enums/sexes';
import { WindowService } from 'src/app/core/services/window.service';
import { NotificatorService } from 'src/app/notification/services/notificator.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';

@Component({
  selector: 'pkdd-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  public person: Person;
  public contentBlocks: ContentBlock[];

  public male = Sexes.Male;
  public female = Sexes.Female;
  public undef = Sexes.Undefined;

  constructor(
    private readonly factory: EntitiesFactoryService,
    private readonly route: ActivatedRoute,
    private readonly storage: ServerDataStorageService,
    public readonly window: WindowService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly confirm: ConfirmService
  ) { }

  ngOnInit() {
    const personModel = this.route.snapshot.data['personModel'];
    this.person = personModel.person;
    this.contentBlocks = personModel.contentBlocks;
  }

  public async onBlockAdd() {
    const newBlock = this.factory.createNewContentBlock(`${this.contentBlocks.length}/`, this.person.bioBlock.id);
    await this.storage.addContentBlock(this.person.bioBlock.id, newBlock);
  }

  public async savePerson() {
    await this.storage.updatePerson(this.person);
  }

  public saveAll() {
    const promises = this.contentBlocks.map(block =>
      this.storage.updateContentBlock(this.person.bioBlock.id, block)
    );
    this.notificator.trackPromise(Promise.all([this.savePerson(), ...promises]), {
      successMessage: 'Обновления успешно сохранены',
      failMessage: 'При сохранении персоны произошла ошибка'
    });
  }

  public togglePublished() {
    this.person.isPublished = !this.person.isPublished;
    this.saveAll();
  }

  public async delete() {
    if (! await this.confirm.confirm(`Вы уверены, что хотите безвовзратно удалить персону ${this.person.name}`)) {
      return;
    }
    const deleting = this.storage.deletePerson(this.person.id);
    await this.notificator.trackPromise(deleting, {
      showProgress: true,
      failMessage: 'При удалении персоны произошла ошибка',
      successMessage: `Персона ${this.person.name} успешно удалена.`
    });
    await this.router.navigateByUrl('/persons');
  }

  public async copy() {
    // TODO: Implement copying persons
    const personToAdd = { ...this.person, id: 0 };
    // personToAdd.forEach(element => {

    // });
    this.storage.addPerson()
  }
}
