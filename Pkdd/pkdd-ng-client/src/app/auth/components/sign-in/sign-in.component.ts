import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pkdd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', './../../auth-styles.scss']
})
export class SignInComponent {

  constructor() { }

  public hide = true;

  public error: string = ' возникла ошибочка';
}
