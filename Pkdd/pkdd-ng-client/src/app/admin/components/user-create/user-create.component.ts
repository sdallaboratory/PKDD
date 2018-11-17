import { PkddUser } from './../../../models/auth/pkdd-user';
import { Component, OnInit, Input } from '@angular/core';
import { TimeTrack } from '../../../models/common/time-track';
import { UserCreateModel } from '../../models/user-create-model';
import { PkddRoles } from '../../../models/auth/pkdd-roles.enum';
import { UserRepositoryService } from '../../services/user-repository.service';

@Component({
  selector: 'pkdd-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  @Input()
  user: UserCreateModel;

  public get isValid() {
    return this.user.email !== ''
    && this.user.name !== null
    && this.user.password !== ''
    && this.user.password.length >= 8
    && this.user.roles.length > 0;
  }

  constructor(
    private readonly repos: UserRepositoryService
  ) { }

  ngOnInit() {
    this.user = this.createNewUserModel();
  }

  public isInRole(role) {
    return this.user ? this.user.roles.some(r => r === role) : false;
  }

  public async onRoleAction(role) {
    const roles = this.user.roles;
    const isInRole = roles.includes(role);
    if (isInRole) {
      roles.splice(roles.indexOf(role), 1);
    } else {
      roles.push(role);
    }
  }

  public async onAdd() {
    const newUser = await this.repos.addUser(this.user);
    if (newUser) {
      this.user = this.createNewUserModel();
    }
  }

  private createNewUserModel() {
    return new UserCreateModel('', 0, '', '', [], false, false, new TimeTrack(new Date(), new Date(), new Date()), false);
  }

}
