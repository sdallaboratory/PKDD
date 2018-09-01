import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../../core/services/window.service';
import { CssBreakpoints } from '../../../models/core/css-breakpoints.enum';

@Component({
  selector: 'pkdd-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(
    public readonly win: WindowService
  ) { }

  ngOnInit() {
  }

  public get isMobile(): boolean {
    return this.win.currentDeviceType === CssBreakpoints.mobile;
  }

}
