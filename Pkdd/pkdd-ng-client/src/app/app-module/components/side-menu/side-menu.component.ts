import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu.service';
import { WindowService } from '../../../core/services/window.service';

@Component({
  selector: 'pkdd-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(
    public readonly menu: MenuService,
    public readonly win: WindowService
  ) { }

  ngOnInit() {
  }

}
