import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'pkdd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public readonly menu: MenuService,
    public readonly win: WindowService
  ) { }
}
