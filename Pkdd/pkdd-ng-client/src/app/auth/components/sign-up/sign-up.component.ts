import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'pkdd-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', './../../auth-styles.scss']
})
export class SignUpComponent {

  constructor(
    private readonly auth: AuthService
  ) { }

  public hide = true;

  public error: string;

  public name: string;

  public email: string;

  public password: string;

  public confirmation: string;

  public async signUp() {
    try {
      await this.auth.signUp(this.name, this.email, this.password);
    } catch (err) {
      this.error = err.error;
    }
  }
}
