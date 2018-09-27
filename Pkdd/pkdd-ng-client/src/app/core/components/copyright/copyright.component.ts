import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'pkdd-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent {

  constructor(
    public readonly env: EnvironmentService
  ) { }

  public get currentYear() {
    return new Date().getFullYear();
  }

}
