import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu.service';
import { WindowService } from '../../../core/services/window.service';

@Component({
  selector: 'pkdd-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(
    public readonly menu: MenuService,
    public readonly win: WindowService
  ) {
    // win.breakpointChanged.subscribe(deviceType => {
    //   console.log(deviceType, win.CurrentSize);
    //   // To change mode of displaying items
    // });
  }

  ngOnInit() {
  }

}
