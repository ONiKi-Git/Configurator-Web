import { Component, OnInit } from '@angular/core';
import { Group } from 'three';
import { ConfiguratorService } from './configurator.service';
import { BulbFitting } from './elements/bulb-fitting';
import { BulbGlass } from './elements/bulb-glass';
import { BulbInternal } from './elements/bulb-internal';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurator';

  bulbLoadProgress: number;

  constructor(public configurator: ConfiguratorService) {}

  ngOnInit() {
    this.configurator.initialize();
  }

  load() {
    let bulb = new BulbGlass(
      this.configurator,
      'assets/meshes/bulb-regular/bulb-glass.glb'
    ).add(
      new BulbFitting(this.configurator, 'assets/meshes/bulb-fitting.glb'),
      new BulbInternal(
        this.configurator,
        'assets/meshes/bulb-regular/bulb-internal.glb'
      )
    );

    this.configurator.loadingManager.onProgress = (_url, loaded, total) => {
      this.bulbLoadProgress = (loaded / total) * 100;
    };

    this.configurator.loadingManager.onLoad = () => {
      this.configurator.controller.scene.add(bulb);
    };
  }

  changeColor(ev: any) {
    const m = this.configurator.materialLibrary.get('glass');
    if (m) {
      m.emissive = ev;
    }
  }

  changeBloomStrength(event: any) {
    this.configurator.controller.postProcess.setBloomStrength(event.value);
  }

  changeBloomRadius(event: any) {
    this.configurator.controller.postProcess.setBloomRadius(event.value);
  }

  async addCouch(data: Group) {
    this.configurator.controller.scene.add(data);
  }
}
