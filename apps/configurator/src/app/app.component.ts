import { Component, OnInit } from '@angular/core';
import { DynamicMesh } from '@torbenvanassche/threejswrapper';
import * as THREE from 'three';
import { BufferGeometry, MeshStandardMaterial } from 'three';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurator';

  opened: boolean;

  constructor(public configurator: ConfiguratorService) { }

  ngOnInit() {
    this.configurator.initialize();
    var m = new DynamicMesh(new THREE.BoxGeometry(), new MeshStandardMaterial(), "Test",
      new Map<string, BufferGeometry>([
        ["sphere", new THREE.SphereBufferGeometry()]
      ]));

    this.configurator.eventHandler.register(m.uuid, () => { m.setOption("sphere") })
    this.configurator.controller.scene.add(m);
  }
}