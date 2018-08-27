import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'pkdd-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input()
  public menuItem: MenuItem;

  @Input()
  public mode: 'full' | 'text' | 'icon';

  constructor() { }

  ngOnInit() {
  }

}
