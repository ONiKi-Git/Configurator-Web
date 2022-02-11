import { Component, Input, OnInit } from '@angular/core';
import { DynamicMesh } from '@torbenvanassche/threejswrapper';

@Component({
  selector: 'oniki-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {
  @Input() target: DynamicMesh;

  @Input() default: string;
  selected: string = "";

  constructor() {}

  ngOnInit(): void {
    this.selected = this.default;
  }

  updateValue() {
    this.target.setOption(this.selected)
  }
}
