import { Pipe, PipeTransform } from '@angular/core';
import { PkddUser } from 'src/app/models/auth/pkdd-user';
import { PkddRoles } from 'src/app/models/auth/pkdd-roles.enum';

@Pipe({
  name: 'userColor',
  pure: false
})
export class UserColorPipe implements PipeTransform {

  transform(user: PkddUser, args?: any): any {
    if (user.isBaseUser) {
      return 'violet';
    } else if (user.isBanned) {
      return 'lightcoral';
    } else if (!user.isConfirmed) {
      return 'yellow';
    } else if (user.roles.includes('admin')) {
      return 'lightgreen';
    }
  }
}
