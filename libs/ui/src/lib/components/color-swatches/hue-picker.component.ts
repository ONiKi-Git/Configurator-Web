import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color } from 'three';

@Component({
  selector: 'oniki-hue-picker',
  templateUrl: './hue-picker.component.html',
  styleUrls: ['./hue-picker.component.scss'],
})
export class HuePickerComponent implements OnInit {
  @Output() color: EventEmitter<Color> = new EventEmitter();

  constructor() {}

  emitColor(ev: any) {
    this.color.emit(new Color(ev.color.hex));
  }

  ngOnInit(): void {
  }
}
