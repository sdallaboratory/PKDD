import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pkdd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', './../../auth-styles.scss']
})
export class SignInComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) { }

  ngAfterViewInit() {
    // required to handle browser autofilled inputs
    this.timer = setInterval(() => {
      this.email = this.email;
      this.password = this.password;
    }, 100);
  }

  public email: string;

  public password: string;

  public remember: boolean;

  public hide = true;

  public error: string;

  public timer: any;

  public onPasswordKeydown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.signIn();
    }
  }

  public async signIn() {
    try {
      const user = await this.auth.signInAsync(this.email, this.password, this.remember);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err.error;
    }
  }

  public ngOnDestroy() {
    clearInterval(this.timer);
  }
}
