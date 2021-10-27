import { Camera } from './camera';
import { Scene } from './scene';
import { Renderer } from './renderer';

import { Bloom } from './bloom';
import { Environment } from './environment';

export class Controller {
  scene!: Scene;

  postProcess!: Bloom;
  environment!: Environment;

  constructor(public renderer: Renderer, public camera: Camera, url: string) {
    this.scene = new Scene();
    this.scene.add(camera);

    this.environment = new Environment(renderer, url);

    this.postProcess = new Bloom(renderer, this.scene, camera, {radius: 2, strength: 1});
    this.updateScene();
  }

  updateScene = () => {
    requestAnimationFrame(this.updateScene);

    this.postProcess.update();

    this.camera.layers.enableAll();
    this.renderer.setClearColor(0x202020);
    this.postProcess.finalComposer.render();
  };
}
