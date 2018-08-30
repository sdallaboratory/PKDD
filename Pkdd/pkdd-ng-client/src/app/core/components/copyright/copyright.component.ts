import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'pkdd-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent {

  constructor(
    public readonly config: EnvironmentService
  ) { }

  public get version() {
    return this.config.config.version;
  }

}
