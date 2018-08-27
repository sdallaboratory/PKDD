import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { WindowService } from '../../services/window.service';

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
    win.WindowResized.subscribe(size => {
      // To change mode of displaying items
    });
  }

  ngOnInit() {
  }

}
