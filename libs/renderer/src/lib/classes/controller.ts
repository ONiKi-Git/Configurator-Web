import { Bloom } from "./bloom";
import { Camera } from "./camera";
import { Environment } from "./environment";
import { RaycastHandler } from "./raycaster";
import { Renderer } from "./renderer";
import { Scene } from "./scene";

export class Controller {
  scene!: Scene;

  postProcess!: Bloom;
  environment!: Environment;
  raycaster!: RaycastHandler;

  constructor(public renderer: Renderer, public camera: Camera, url: string) {
    this.scene = new Scene();
    this.scene.add(camera);

    this.environment = new Environment(renderer, url);
    this.postProcess = new Bloom(renderer, this.scene, camera, {radius: 2, strength: 1, threshold: 0});
    this.raycaster = new RaycastHandler(this);

    this.updateScene();
  }

  updateScene = () => {
    requestAnimationFrame(this.updateScene);

    this.postProcess.update();

    this.camera.layers.enableAll();
    this.renderer.setClearColor(0x404040);
    this.postProcess.finalComposer.render();
  };
}
