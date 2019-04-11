import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pkdd-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public query = '';

  @Output()
  public readonly queryChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onInput() {
    this.queryChange.emit(this.query);
  }

  public onClear() {
    this.query = '';
    this.onInput();
  }

}
