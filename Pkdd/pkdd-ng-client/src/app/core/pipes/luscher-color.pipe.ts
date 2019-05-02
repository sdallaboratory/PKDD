import { Pipe, PipeTransform } from '@angular/core';
import { ColorName } from 'src/app/models/persons/results/luscher-result';

@Pipe({
  name: 'luscherColor'
})
export class LuscherColorPipe implements PipeTransform {

  private static names: { [key in ColorName]: string } = {
    grey: 'Серый',
    pink: 'Фиолетовый',
    black: 'Чёрный',
    yellow: 'Жёлтый',
    green: 'Зелёный',
    blue: 'Синий',
    red: 'Красный',
    brown: 'Коричневый',
  };

  transform(colorName: ColorName): string {
    if (!(colorName in LuscherColorPipe.names)) {
      return 'Неизвестная шкала';
    } else {
      return LuscherColorPipe.names[colorName];
    }
  }

}
