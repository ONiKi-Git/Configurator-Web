import { Component, DebugElement, OnInit } from '@angular/core';
import {
  Controller,
  Renderer,
  Camera,
  TextureLibrary,
  TextureType,
  MaterialLibrary
} from '@torbenvanassche/threejswrapper';
import * as THREE from 'three';
import { MaterialLoader, Vector3 } from 'three';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurator';

  controller!: Controller;

  ngOnInit() {
    //Initialize renderer
    const renderer = new Renderer(
      window.innerWidth - 10,
      window.innerHeight - 20
    );

    //Create Libraries
    const textureLibrary = new TextureLibrary();
    const materialLibrary = new MaterialLibrary();

    //Create general purpose controller
    this.controller = new Controller(renderer, new Camera(new THREE.Vector3(2, 2, 2), 75, renderer).addOrbitControls(false, true, true));
    document.body.appendChild(this.controller.renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = materialLibrary.add("Wooden Cube", new THREE.MeshPhysicalMaterial());

    textureLibrary.load('albedo', 'assets/wood/albedo.jpg', TextureType.DIFFUSE, material);
    textureLibrary.load('normal', 'assets/wood/normal.jpg', TextureType.NORMAL, material);
    textureLibrary.load('roughness', 'assets/wood/roughness.jpg', TextureType.ROUGHNESS, material);
    textureLibrary.load('ao', 'assets/wood/ao.jpg', TextureType.AO, material);

    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry(),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff })
    );
    plane.name = 'plane';
    plane.lookAt(new Vector3(0, 1, 0));
    plane.scale.setScalar(4);
    plane.position.y -= 0.5;
    this.controller.scene.add(plane);
    plane.receiveShadow = true;

    const cube = new THREE.Mesh(geometry, material);
    cube.name = 'Cube';
    this.controller.scene.add(cube);
    cube.castShadow = true;
  }
}
