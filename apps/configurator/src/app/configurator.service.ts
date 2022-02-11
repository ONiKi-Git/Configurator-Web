import { Injectable } from '@angular/core';
import {
  Camera,
  Controller,
  EventHandler,
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

  //May need to be moved to Controller level to avoid conflicts between scenes
  eventHandler: EventHandler;

  canvas: HTMLElement;

  constructor() {
    ConfiguratorService.instance = this;
    fromEvent(window, 'resize').subscribe((evt: Event) => {
      this.controller.renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      this.controller.camera.aspect =
        this.canvas!.offsetWidth / this.canvas!.offsetHeight;

      this.controller.camera.updateProjectionMatrix();
    });
  }

  initialize(cameraPosition: Vector3 = new Vector3()) {
    //Initialize renderer
    this.canvas = document.getElementById('three')!;
    const renderer = new Renderer(
      this.canvas!.offsetWidth,
      this.canvas!.offsetHeight
    );
    const camera = new Camera(
      cameraPosition,
      75,
      renderer
    ).addOrbitControls(false, true, true);

    //Create Libraries
    this.textureLibrary = new TextureLibrary();
    this.materialLibrary = new MaterialLibrary();
    this.meshLibrary = new MeshLibrary(this.loadingManager);
    this.eventHandler = new EventHandler();

    //Create general purpose controller
    this.controller = new Controller(renderer, camera, 'assets/hilly_terrain_01_1k.exr');

    //Setup event dispatcher
    this.controller.raycaster.result.subscribe(x => {
      this.eventHandler.trigger(x.uuid);
    })

    renderer.setSize(this.canvas!.offsetWidth, this.canvas!.offsetHeight);
    this.canvas?.appendChild(this.controller.renderer.domElement);
  }

  public loadModel(url: string, onProgress: (p: number) => void = () => {}) {
    const loadedGroup = this.meshLibrary.load(
      url.match(/([^\/]+)(?=\.\w+$)/)![0],
      url,
      (progress) => {
        onProgress(progress);
      }
    );

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
