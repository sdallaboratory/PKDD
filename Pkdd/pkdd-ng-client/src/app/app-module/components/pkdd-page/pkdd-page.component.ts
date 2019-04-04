import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../../core/services/window.service';
import { MenuService } from '../../../core/services/menu.service';
import { RoutingTrackerService } from '../../services/routing-tracker.service';

@Component({
  selector: 'pkdd-pkdd-page',
  templateUrl: './pkdd-page.component.html',
  styleUrls: ['./pkdd-page.component.scss']
})
export class PkddPageComponent {

  constructor(
    public readonly menu: MenuService,
    public readonly window: WindowService,
    // in purpose to create
    private readonly tracker: RoutingTrackerService
  ) { }

}
