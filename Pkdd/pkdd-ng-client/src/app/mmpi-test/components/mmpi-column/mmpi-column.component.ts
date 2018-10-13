import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pkdd-mmpi-column',
  templateUrl: './mmpi-column.component.html',
  styleUrls: ['./mmpi-column.component.scss']
})
export class MmpiColumnComponent implements OnInit {

  @Input()
  public name: string;

  @Input()
  public value: number;

  @Output()
  public valueChange: EventEmitter<number>;

  constructor() { }

  ngOnInit() {
  }

}
