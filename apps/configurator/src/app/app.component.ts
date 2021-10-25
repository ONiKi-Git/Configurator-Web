import { Component, DebugElement, OnInit } from '@angular/core';
import {
  Controller,
  Renderer,
  Camera,
  TextureLibrary,
  TextureType,
  MaterialLibrary,
  MeshLibrary
} from '@torbenvanassche/threejswrapper';
import * as THREE from 'three';
import { MeshPhysicalMaterial, Vector3 } from 'three';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurator';

  controller!: Controller;

  textureLibrary!: TextureLibrary;
  materialLibrary!: MaterialLibrary;
  meshLibrary!: MeshLibrary;

  ngOnInit() {
    //Initialize renderer
    const renderer = new Renderer(
      window.innerWidth - window.innerWidth * 0.2,
      window.innerHeight
    );

    //Create Libraries
    this.textureLibrary = new TextureLibrary();
    this.materialLibrary = new MaterialLibrary();
    this.meshLibrary = new MeshLibrary();

    //Create general purpose controller
    this.controller = new Controller(renderer, new Camera(new THREE.Vector3(2, 2, 2), 75, renderer).addOrbitControls(false, true, true));

    document.getElementById("three")!.appendChild(this.controller.renderer.domElement);
    const material = new MeshPhysicalMaterial();
    this.materialLibrary.add("ground", material);
    
    this.meshLibrary.load("Couch", "assets/couch.glb").subscribe(x => {
      x.traverse(y => {
        if(y.type === "Mesh") {
          y.castShadow = true;
        }
      })
      this.controller.scene.add(x);
    });

    this.textureLibrary.load('albedo', 'assets/WoodFlooring044_COL_2K.jpg', TextureType.DIFFUSE, material).subscribe(x => {
      x.wrapS = THREE.RepeatWrapping;
      x.wrapT = THREE.RepeatWrapping;
      x.repeat.set(2, 2);
    });
  }

  public AddFloor() {
    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry(),
      this.materialLibrary.get("ground")
    );
    plane.name = 'plane';
    plane.lookAt(new Vector3(0, 1, 0));
    plane.rotateZ(Math.PI / 2)
    plane.scale.setScalar(4);
    this.controller.scene.add(plane);
    plane.receiveShadow = true;
  }
}
