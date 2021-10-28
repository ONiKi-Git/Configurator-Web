import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'oniki-loader-with-progress',
  templateUrl: './loader-with-progress.component.html',
  styleUrls: ['./loader-with-progress.component.scss'],
})
export class ModelLoaderWithProgressComponent implements OnInit {
  @Input() text!: string;
  @Input() loadProgress!: number;

  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleButton() {
    this.clicked.emit();
  }
}
