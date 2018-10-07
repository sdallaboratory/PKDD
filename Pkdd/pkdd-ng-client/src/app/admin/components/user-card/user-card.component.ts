import { Component, OnInit, Input } from '@angular/core';
import { PkddUser } from '../../../models/auth/pkdd-user';
import { PkddRoles } from '../../../models/auth/pkdd-roles.enum';
import { UserRepositoryService } from '../../services/user-repository.service';

@Component({
  selector: 'pkdd-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  public user: PkddUser;

  constructor(
    private readonly repos: UserRepositoryService
  ) { }

  ngOnInit() {
  }

  public async addOrRemoveRole(role: PkddRoles) {
    const roles = this.user.roles;
    const isInRole = roles.includes(role);
    const result = await this.repos.addOrRemoveRole(this.user.id, isInRole, role);
    if (result && isInRole) {
      roles.splice(roles.indexOf(role), 1);
    } else if (result && !isInRole) {
      roles.push(role);
    }
  }

  public async banOrUnban() {
    const result = await this.repos.banOrUnbanUser(this.user.id, this.user.isBanned);
    if (result) {
      this.user.isBanned = !this.user.isBanned;
    }
  }

  public async confirm() {
    const result = this.repos.confirm(this.user.id);
    if (result) {
      this.user.isConfirmed = true;
    }
  }

  public delete() {
    this.repos.deleteUser(this.user.id);
  }

  public isInRole(role: PkddRoles) {
    return this.user ? this.user.roles.some(r => r === role) : false;
  }
}
