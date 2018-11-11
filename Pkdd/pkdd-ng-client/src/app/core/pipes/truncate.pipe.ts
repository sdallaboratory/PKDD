import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  public transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    let truncated: string;
    if (value !== undefined && value != null && value.length > limit) {
      if (completeWords) {
        limit = value.substr(0, limit).lastIndexOf(' ');
      }
      truncated = `${value.substr(0, limit)}${ellipsis}`;
    } else {
      truncated = value;
    }
    return truncated;
  }
}
