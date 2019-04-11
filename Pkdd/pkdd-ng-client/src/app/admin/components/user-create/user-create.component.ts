import { PkddUser } from './../../../models/auth/pkdd-user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeTrack } from '../../../models/common/time-track';
import { UserCreateModel } from '../../models/user-create-model';
import { PkddRoles } from '../../../models/auth/pkdd-roles.enum';
import { UserRepositoryService } from '../../services/user-repository.service';
import { NotificatorService } from 'src/app/notification/services/notificator.service';

@Component({
  selector: 'pkdd-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  @Input()
  user!: UserCreateModel;

  @Output()
  public readonly userCreated: EventEmitter<PkddUser> = new EventEmitter();

  public get isValid() {
    return this.user.email !== ''
      && this.user.name !== null
      && this.user.password !== ''
      && this.user.password.length >= 8
      && this.user.roles.length > 0;
  }

  constructor(
    private readonly repos: UserRepositoryService,
    private readonly notificator: NotificatorService,
  ) { }

  ngOnInit() {
    this.user = this.createNewUserModel();
  }

  public isInRole(role: PkddRoles) {
    return this.user ? this.user.roles.some(r => r === role) : false;
  }

  public async onRoleAction(role: PkddRoles) {
    const roles = this.user.roles;
    const isInRole = roles.includes(role);
    if (isInRole) {
      roles.splice(roles.indexOf(role), 1);
    } else {
      roles.push(role);
    }
  }

  public async onAdd() {
    const userPromise = this.repos.addUser(this.user);
    this.notificator.trackPromise(userPromise, {
      showProgress: true,
      successMessage: 'Пользователь успешно создан.',
      failMessage: 'Не удалось создать пользователя. Попробуйте ещё раз.'
    });
    const newUser = await userPromise;
    if (newUser) {
      this.user = this.createNewUserModel();
      this.userCreated.emit(newUser);
    }
  }

  private createNewUserModel() {
    return new UserCreateModel('', 0, '', '', [], false, false, new TimeTrack(new Date(), new Date(), new Date()), false);
  }

}
