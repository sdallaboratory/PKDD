import { Injectable, EventEmitter } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { CssBreakpoints } from '../../models/core/css-breakpoints.enum';
import { WindowSize } from '../../models/core/window-size';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private readonly _window = window;

  private _currentSize: WindowSize;

  public get currentSize() {
    return this._currentSize;
  }

  public get currentDeviceType() {
    return this.getBreakpoint(this._currentSize.width).deviceType;
  }

  public readonly WindowResized: EventEmitter<WindowSize> = new EventEmitter();

  public readonly breakpointChanged: EventEmitter<CssBreakpoints> = new EventEmitter();

  constructor(
    private readonly env: EnvironmentService
  ) {
    this.updateCurrentSize();
    this._window.addEventListener('resize', (event) => {
      this.checkCssBreackpoints();
      this.updateCurrentSize();
      this.WindowResized.emit(this._currentSize);
    });
  }

  private checkCssBreackpoints() {
    if (this.getBreakpoint(this._currentSize.width).deviceType
      !== this.getBreakpoint(this._window.innerWidth).deviceType) {
      this.breakpointChanged.emit(this.getBreakpoint(this._window.innerWidth).deviceType);
    }
  }

  private getBreakpoint(winWidth: number) {
    return this.env.config.cssBreakpoints.find(bp => winWidth <= bp.maxWidth && winWidth >= bp.minWidth);
  }

  private updateCurrentSize() {
    this._currentSize = new WindowSize(this._window.innerWidth, this._window.innerHeight);
  }

}
