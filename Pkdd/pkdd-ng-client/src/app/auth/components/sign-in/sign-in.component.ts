import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'pkdd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', './../../auth-styles.scss']
})
export class SignInComponent {

  constructor(
    private readonly auth: AuthService
  ) { }


  public email: string;

  public password: string;

  public remember: boolean;

  public hide = true;

  public error: string;

  public async signIn() {
    try {

      const user = await this.auth.signIn(this.email, this.password, this.remember);
      if (!user) {
        this.error = 'Неа!';
      }
    } catch (err) {
      this.error = err.error;
    }
  }
}
