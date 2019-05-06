import { Pipe, PipeTransform } from '@angular/core';
import { PkddRoles } from 'src/app/models/auth/pkdd-roles.enum';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  private readonly roles: { [key in PkddRoles]: string } = {
    admin: 'Администратор',
    tech: 'Технолог',
    expert: 'Эксперт',
  }

  transform(role: PkddRoles) {
    return this.roles[role];
  }

}
