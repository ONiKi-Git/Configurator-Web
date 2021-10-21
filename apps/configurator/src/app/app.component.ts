import { Component, OnInit } from '@angular/core';
import { Controller, Renderer, Camera } from '@torbenvanassche/threejswrapper';
import * as THREE from 'three';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurator';

  controller!: Controller;

  ngOnInit() {
    const renderer = new Renderer(window.innerWidth, window.innerHeight);
    const camera = new Camera(new THREE.Vector3(2, 2, 2), 75, renderer);
    camera.addOrbitControls(false, true, true)
    this.controller = new Controller(renderer, camera);
    
    document.body.appendChild(this.controller.renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.name = "Cube";
    this.controller.scene.add(cube);

    const dirLight = new THREE.DirectionalLight(0xffa95c);
    dirLight.name = "Directional Light";
    dirLight.position.set(-1, 1, 1);
    this.controller.scene.add(dirLight);

    const ambientLight = new THREE.HemisphereLight(0xffeeb1, 0x080820);
    ambientLight.name = "Ambient Light";
    this.controller.scene.add(ambientLight);
  }
}
