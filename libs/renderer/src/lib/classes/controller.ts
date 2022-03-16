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
    //this.postProcess = new Bloom(renderer, this.scene, camera, {radius: 0.5, strength: 3, threshold: 0.8});
    this.raycaster = new RaycastHandler(this);

    this.updateScene();
  }

  updateScene = () => {
    requestAnimationFrame(this.updateScene);

    if (this.postProcess) this.postProcess.update();

    this.camera.layers.enableAll();
    this.renderer.setClearColor(0x404040);
    if (this.postProcess) this.postProcess.finalComposer.render();
    else this.renderer.render(this.scene, this.camera);
    
  };
}
