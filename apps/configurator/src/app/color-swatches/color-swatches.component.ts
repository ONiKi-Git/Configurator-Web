import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color } from 'three';

@Component({
  selector: 'oniki-color-swatches',
  templateUrl: './color-swatches.component.html',
  styleUrls: ['./color-swatches.component.scss'],
})
export class ColorSwatchesComponent implements OnInit {
  circleSize: number;

  @Output() color: EventEmitter<Color> = new EventEmitter();

  constructor() {}

  emitColor(ev: any) {
    this.color.emit(new Color(ev.color.hex));
  }

  ngOnInit(): void {
    const d = document.getElementById('ui');
    if (d) {
      this.circleSize = d.clientWidth / 11;
    }
  }
}
