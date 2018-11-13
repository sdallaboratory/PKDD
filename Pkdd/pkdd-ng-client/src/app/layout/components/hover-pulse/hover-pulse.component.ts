import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pkdd-hover-pulse',
  templateUrl: './hover-pulse.component.html',
  styleUrls: ['./hover-pulse.component.scss']
})
export class HoverPulseComponent implements OnInit {

  @Output()
  public click: EventEmitter<void> = new EventEmitter();

  @ViewChild('wrapper')
  public wrapper: ElementRef;



  constructor() { }

  ngOnInit() {
    this.wrapper.nativeElement.onClick = () => {
      this.click.emit();
    };
  }

}
