import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../../core/services/window.service';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'pkdd-pkdd-page',
  templateUrl: './pkdd-page.component.html',
  styleUrls: ['./pkdd-page.component.scss']
})
export class PkddPageComponent {

  constructor(
    public readonly menu: MenuService,
    public readonly win: WindowService
  ) { }

}
