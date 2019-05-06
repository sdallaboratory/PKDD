import { Pipe, PipeTransform } from '@angular/core';
import { Group } from 'src/app/models/persons/results/physiognomy-result';

@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {

  transform(group: Group) {
    return group.replace('group', 'Группа ');
  }

}
