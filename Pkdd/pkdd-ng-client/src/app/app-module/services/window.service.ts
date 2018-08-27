import { Injectable, EventEmitter } from '@angular/core';
import { WindowSize } from '../models/window-size';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private readonly _window = window;

  constructor(

  ) {
    this._window.addEventListener('resize', (event) => {
      this.WindowResized.emit(new WindowSize(this._window.innerWidth, this._window.innerHeight));
    });
  }

  public readonly WindowResized: EventEmitter<WindowSize>;
}
