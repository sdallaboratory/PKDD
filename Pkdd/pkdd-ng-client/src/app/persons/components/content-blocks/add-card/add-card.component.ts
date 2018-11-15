import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pkdd-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  @Input()
  public readonly text: string = 'Добавить';

  constructor() { }

  ngOnInit() {
  }

}
