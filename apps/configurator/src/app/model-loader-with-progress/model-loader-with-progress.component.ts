import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Group } from 'three';
import { ConfiguratorService } from '../configurator.service';

@Component({
  selector: 'oniki-model-loader-with-progress',
  templateUrl: './model-loader-with-progress.component.html',
  styleUrls: ['./model-loader-with-progress.component.scss'],
})
export class ModelLoaderWithProgressComponent implements OnInit {
  @Input() text: string;
  @Input() url: string;
  @Input() name: string;

  @Output() clicked = new EventEmitter<Subject<Group>>();

  loadedMesh: Subject<Group>;
  loadProgress: number = 0;

  constructor(private configurator: ConfiguratorService) {}

  ngOnInit(): void {}

  async handleButton() {
    this.clicked.emit(await this.loadModel());
  }

  private async loadModel() {
    this.loadedMesh = await this.configurator.meshLibrary.load(
      this.name,
      this.url,
      (progress) => {
        this.loadProgress = progress;
      }
    );

    return this.loadedMesh;
  }
}
