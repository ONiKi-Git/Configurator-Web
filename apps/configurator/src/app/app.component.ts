import { Component, OnInit } from '@angular/core';
import { RaycastHandler } from '@torbenvanassche/threejswrapper';
import { Group, Mesh, Vector3 } from 'three';
import { ConfiguratorService } from './configurator.service';
import { BulbFitting } from './elements/bulb-fitting';
import { BulbGlass } from './elements/bulb-glass';
import { BulbInternal } from './elements/bulb-internal';
import { Cable } from './elements/cable';
import { Socket } from './elements/socket';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurator';

  bulbLoadProgress: number;

  bulb: BulbGlass;
  objectRoot: Mesh;

  opened: boolean;

  constructor(public configurator: ConfiguratorService) {}

  ngOnInit() {
    this.configurator.initialize();

    this.objectRoot = new Socket(
      this.configurator,
      'assets/meshes/Socket/Socket.glb'
    );

    var cable = new Cable(this.configurator, 'assets/meshes/cable.glb');
    this.objectRoot.add(cable);

    this.load();

    new RaycastHandler(this.configurator.controller);
  }

  loadOptional(name: string) {
    this.bulb.replaceGeometry(name);
  }

  load() {
    this.bulb = new BulbGlass(
      this.configurator,
      'assets/meshes/bulb-regular/bulb-glass.glb'
    ).add(
      new BulbFitting(this.configurator, 'assets/meshes/bulb-fitting.glb'),
      new BulbInternal(
        this.configurator,
        'assets/meshes/bulb-regular/bulb-internal.glb'
      )
    );

    this.configurator
      .loadModel('assets/meshes/bulb-variant1/bulb-glass.glb')
      .subscribe((x) => {
        (x.children[0] as Mesh).geometry.rotateX(Math.PI);
        (x.children[0] as Mesh).geometry.translate(0, 0, 0.19);

        this.bulb.addOption('variant1', (x.children[0] as Mesh).geometry);
      });

    this.configurator.loadingManager.onProgress = (_url, loaded, total) => {
      this.bulbLoadProgress = (loaded / total) * 100;
    };

    this.configurator.loadingManager.onLoad = () => {
      this.configurator.controller.scene.add(this.bulb);
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
