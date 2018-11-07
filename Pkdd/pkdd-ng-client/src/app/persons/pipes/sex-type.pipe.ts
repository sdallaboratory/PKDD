import { Pipe, PipeTransform } from '@angular/core';
import { Sexes } from '../../models/entities/enums/sexes';

@Pipe({
  name: 'sexType'
})
export class SexTypePipe implements PipeTransform {

  transform(sex: Sexes): any {
    if (sex === Sexes.Male) {
      return 'Мужской';
    }
    if (sex === Sexes.Female) {
      return 'Женский';
    }
    if (sex === Sexes.Undefined) {
      return 'Неопределенный';
    }
  }

}
