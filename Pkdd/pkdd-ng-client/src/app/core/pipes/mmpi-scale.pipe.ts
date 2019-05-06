import { Pipe, PipeTransform } from '@angular/core';
import { MmpiResult } from 'src/app/models/persons/results/mmpi-result';

@Pipe({
  name: 'mmpiScale'
})
export class MmpiScalePipe implements PipeTransform {

  private static names: { [key in keyof MmpiResult]: string } = {
    hypochondriasis: 'Поиск причин неудач вовне',
    depression: 'Самокритика',
    hysteria: 'Демонстративность',
    psychopathia: 'Решительность',

    masculinity: 'Чувствительность натуры',
    paranoia: 'Настойчивость',
    psychasthenia: 'Футурологическая тревога',
    schizophrenia: 'Индивидуализированность',
    hypomania: 'Оптимизм',
    sociality: 'Замкнутость',
  };

  transform(scale: keyof MmpiResult): string {
    if (!(scale in MmpiScalePipe.names)) {
      return 'Неизвестная шкала';
    } else {
      return MmpiScalePipe.names[scale];
    }
  }
}

