import { Pipe, PipeTransform } from '@angular/core';
import { PkddRoles } from '../../models/auth/pkdd-roles.enum';

@Pipe({
  name: 'strongestRole',
  pure: false
})
export class StrongestRolePipe implements PipeTransform {

  transform(role: PkddRoles[]): PkddRoles {
    if (role.includes('admin')) {
      return 'admin';
    }
    if (role.includes('tech')) {
      return 'tech';
    }
    if (role.includes('expert')) {
      return 'expert';
    }
    // TODO: add visitor role
    return;
  }

}
