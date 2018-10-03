import { Component, OnInit, Input } from '@angular/core';
import { PkddUser } from '../../../models/auth/pkdd-user';

@Component({
  selector: 'pkdd-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  public user: PkddUser;

  constructor() { }

  ngOnInit() {
  }

}
