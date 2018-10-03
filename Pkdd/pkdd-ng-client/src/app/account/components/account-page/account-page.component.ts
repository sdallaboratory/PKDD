import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'pkdd-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  constructor(private readonly auth: AuthService) { }

  public load: boolean;

  ngOnInit() {
  }

  public async  signOut() {
    this.load = true;
    await this.auth.signOutAsync();
    this.load = false;
  }
}
