import { Component, OnInit, Input } from '@angular/core';
import { PkddUser } from '../../../models/auth/pkdd-user';
import { PkddRoles } from '../../../models/auth/pkdd-roles.enum';

@Component({
  selector: 'pkdd-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  public user: PkddUser;

  constructor() { }

  ngOnInit() {
  }

  onRoleAction(role: PkddRoles) {
    const roles = this.user.roles;
    if (roles.includes(role)) {
      roles.splice(roles.indexOf(role), 1);
    } else {
      roles.push(role);
    }
  }

  public isInRole(role: PkddRoles) {
    return this.user ? this.user.roles.some(r => r === role) : false;
  }
}
