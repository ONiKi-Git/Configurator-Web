import { Injectable } from '@angular/core';
import {
  Camera,
  Controller,
  MaterialLibrary,
  MeshLibrary,
  Renderer,
  TextureLibrary,
} from '@torbenvanassche/threejswrapper';
import { fromEvent, ReplaySubject } from 'rxjs';
import { Group, Vector3 } from 'three';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  controller: Controller;

  textureLibrary: TextureLibrary;
  materialLibrary: MaterialLibrary;
  meshLibrary: MeshLibrary;

  constructor() {
    fromEvent(window, 'resize').subscribe((evt: Event) => {
      this.controller.renderer.setSize(
        window.innerWidth * 0.85,
        window.innerHeight
      );

      this.controller.camera.aspect =
        this.controller.renderer.domElement.width /
        this.controller.renderer.domElement.height;

      this.controller.camera.updateProjectionMatrix();
    });
  }

  initialize() {
    //Initialize renderer
    const renderer = new Renderer(window.innerWidth * 0.85, window.innerHeight);
    const camera = new Camera(
      new Vector3(0, 0, 0.7),
      75,
      renderer
    ).addOrbitControls(false, true, true);

    //Create Libraries
    this.textureLibrary = new TextureLibrary();
    this.materialLibrary = new MaterialLibrary();
    this.meshLibrary = new MeshLibrary();

    //Create general purpose controller
    this.controller = new Controller(renderer, camera, 'assets/studio_1k.exr');

    document
      .getElementById('three')
      ?.appendChild(this.controller.renderer.domElement);
  }

  public loadModel(
    name: string,
    url: string,
    onProgress: (p: number) => void = () => {}
  ) {
    const loadedMesh = this.meshLibrary.load(name, url, (progress) => {
      onProgress(progress);
    });

    return loadedMesh;
  }
}
