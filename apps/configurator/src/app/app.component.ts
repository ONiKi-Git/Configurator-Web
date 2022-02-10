import { Component, OnInit } from '@angular/core';
import { DynamicMesh } from '@torbenvanassche/threejswrapper';
import * as THREE from 'three';
import { BufferGeometry, MathUtils, Mesh, MeshStandardMaterial, Vector3 } from 'three';
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
    this.configurator.initialize(new Vector3(-1, 1.1, 1));

    this.configurator.meshLibrary.load("body", "assets/meshes/Seperate_Body_Strong.gltf").subscribe(x => {
      x.scale.setScalar(0.01);
      this.configurator.controller.scene.add(x);
    })

    this.configurator.meshLibrary.load("body", "assets/meshes/Seperate_Legs_Roller.gltf").subscribe(x => {
      x.scale.setScalar(0.01);
      x.position.setY(-0.3)
      this.configurator.controller.scene.add(x);
    })

    this.configurator.meshLibrary.load("body", "assets/meshes/Seperate_Light_C.gltf").subscribe(x => {
      x.scale.setScalar(0.01);
      x.position.setY(0.3);
      x.rotation.setFromVector3(new Vector3(MathUtils.degToRad(-10), 0, 0));
      this.configurator.controller.scene.add(x);
    })

    var m = new DynamicMesh(new THREE.BoxGeometry(), new MeshStandardMaterial(), "Test",
      new Map<string, BufferGeometry>([
        ["sphere", new THREE.SphereBufferGeometry()]
      ]));
  }
}