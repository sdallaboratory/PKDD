import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../../models/core/menu-item';
import { CssBreakpoints } from '../../../models/core/css-breakpoints.enum';

@Component({
  selector: 'pkdd-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input()
  public menuItem: MenuItem;

  @Input()
  public mode: CssBreakpoints = CssBreakpoints.pc;

  constructor() { }

  ngOnInit() {
  }

}
