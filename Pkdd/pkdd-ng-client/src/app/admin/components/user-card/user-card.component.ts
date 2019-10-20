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
  public user!: PkddUser;

  constructor(
    private readonly repos: UserRepositoryService
  ) { }

  ngOnInit() {
  }

  public roleUpdating = false;

  public async addOrRemoveRole(role: PkddRoles) {
    if (this.user.isBaseUser) {
      return;
    }
    try {
      this.roleUpdating = true;
      const roles = this.user.roles.map(r => r.toString());
      const isInRole = roles.includes(role);
      const result = await this.repos.addOrRemoveRole(this.user.id, isInRole, role);
      if (result && isInRole) {
        this.user.roles.splice(roles.indexOf(role), 1);
      } else if (result && !isInRole) {
        this.user.roles.push(role);
      }
    } finally {
      this.roleUpdating = false;
    }

  }

  public async ToggleBanned() {
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

  public async delete() {
    await this.repos.deleteUser(this.user.id)
  }

  public isInRole(role: PkddRoles | string) {
    return this.user ? this.user.roles.some(r => r === role) : false;
  }
}
