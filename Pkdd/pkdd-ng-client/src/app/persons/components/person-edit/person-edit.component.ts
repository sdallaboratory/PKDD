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
import { TimeTrack } from 'src/app/models/common/time-track';
import { BaseBioBlock } from 'src/app/models/entities/base-bio-block';

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
    const baseBioBlock = new BaseBioBlock({
      id: 0,
      personId: 0,
      isDeleted: false,
      timeTrack: new TimeTrack(new Date(), new Date(), new Date),
    }, []);
    const abstractPerson = {
      ...this.person,
      id: 0,
      bioBlock: null,
      name: `${this.person.name} (Копия)`,
      timeTrack: new TimeTrack(new Date(), new Date(), new Date()),
      views: 0,
      isPublished: false,
    };
    const personToAdd = new Person(abstractPerson, baseBioBlock);
    const clonedPerson = await this.storage.addPerson(personToAdd);
    console.log(clonedPerson, clonedPerson.bioBlock);
    const cloning = this.cloneBlocks(this.contentBlocks, clonedPerson);
    await this.notificator.trackPromise(cloning, {
      showProgress: true,
      successMessage: `Песрона ${clonedPerson.name} была успешно скопирована.`
    });
    await this.router.navigateByUrl(`/`, { skipLocationChange: true });
    await this.router.navigateByUrl(`/persons/${clonedPerson.id}/edit`);
  }

  private async cloneBlocks(blocks: ContentBlock[], person: Person) {
    for (const block of blocks) {
      const newBlock = this.factory.createNewContentBlock(`${blocks.length}/`, person.bioBlock.id);
      newBlock.comment = block.comment;
      newBlock.content = block.content;
      newBlock.order = block.order;
      newBlock.subtitle = block.subtitle;
      newBlock.type = block.type;

      await this.storage.addContentBlock(person.bioBlock.id, newBlock);
      if (block.subBlocks.length) {
        await this.cloneBlocks(block.subBlocks, person);
      }
    }
  }
}
