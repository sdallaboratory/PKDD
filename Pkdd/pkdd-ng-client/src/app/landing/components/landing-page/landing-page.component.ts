import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PkddUser } from 'src/app/models/auth/pkdd-user';

@Component({
  selector: 'pkdd-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public user?: PkddUser;

  constructor(
    public readonly auth: AuthService
  ) {
  }

  ngOnInit() {
    this.auth.getUserAsync().then(user => this.user = user);
  }

}
