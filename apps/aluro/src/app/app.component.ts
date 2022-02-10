import { Component } from '@angular/core';
import * as svg from '@svgdotjs/svg.js';


@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'aluro';

  constructor() {
    var draw = svg.SVG().addTo('body').size(300, 300);
    var arr = new svg.Array([0, 0, 0, 100, 100, 100, 100, 0])
    draw.polygon(arr).fill("0x000000");
  }
}
