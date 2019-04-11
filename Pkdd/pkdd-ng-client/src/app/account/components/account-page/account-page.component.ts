import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { PkddUser } from 'src/app/models/auth/pkdd-user';

@Component({
  selector: 'pkdd-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  constructor(private readonly auth: AuthService) { }

  public load: boolean;

  public user: PkddUser;

  async ngOnInit() {
    try {
      this.user = await this.auth.getUserAsync();
    } catch { }
  }

  public async signOut() {
    this.load = true;
    await this.auth.signOutAsync();
    this.load = false;
  }
}
