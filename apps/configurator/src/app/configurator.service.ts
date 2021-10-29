import { Injectable } from '@angular/core';
import {
  Camera,
  Controller,
  MaterialLibrary,
  MeshLibrary,
  Renderer,
  TextureLibrary,
} from '@torbenvanassche/threejswrapper';
import { fromEvent } from 'rxjs';
import { LoadingManager, Mesh, Vector3 } from 'three';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorService {
  controller: Controller;

  loadingManager: LoadingManager = new LoadingManager();

  static instance: ConfiguratorService;

  textureLibrary: TextureLibrary;
  materialLibrary: MaterialLibrary;
  meshLibrary: MeshLibrary;

  constructor() {
    ConfiguratorService.instance = this;
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
    this.meshLibrary = new MeshLibrary(this.loadingManager);

    //Create general purpose controller
    this.controller = new Controller(renderer, camera, 'assets/studio_1k.exr');

    document
      .getElementById('three')
      ?.appendChild(this.controller.renderer.domElement);
  }

  public loadModel(
    url: string,
    onProgress: (p: number) => void = () => {}
  ) {
    const loadedGroup = this.meshLibrary.load(url.match(/([^\/]+)(?=\.\w+$)/)![0], url, (progress) => {
      onProgress(progress);
    });

    loadedGroup.subscribe((m) => {
      m.traverse((x) => {
        if (x instanceof Mesh) {
          x.rotation.copy(m.rotation);
        }
      });
    });

    return loadedGroup;
  }
}
