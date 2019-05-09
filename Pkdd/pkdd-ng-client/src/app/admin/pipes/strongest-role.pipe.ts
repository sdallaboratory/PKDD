import { Pipe, PipeTransform } from '@angular/core';
import { PkddRoles } from '../../models/auth/pkdd-roles.enum';

@Pipe({
  name: 'strongestRole',
  pure: false
})
export class StrongestRolePipe implements PipeTransform {

  transform(role: PkddRoles[], args?: any): any {
    if (role.includes('admin')) {
      return 'Администратор';
    }
    if (role.includes('tech')) {
      return 'Технолог';
    }
    if (role.includes('expert')) {
      return 'Эксперт';
    }
    return 'Пользователь';
  }

}
