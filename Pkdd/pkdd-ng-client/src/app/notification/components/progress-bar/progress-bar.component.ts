import { Component, OnInit } from '@angular/core';
import { NotificatorService } from '../../services/notificator.service';

@Component({
  selector: 'pkdd-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor(
    public readonly notificator: NotificatorService
  ) { }

  ngOnInit() {
  }

}
