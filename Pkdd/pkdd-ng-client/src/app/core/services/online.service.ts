import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { mapTo, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  public readonly isOnline: Observable<boolean>;

  constructor() {
    this.isOnline = merge(
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)),
    ).pipe(
      share()
    );
  }
}
