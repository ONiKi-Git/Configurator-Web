import { Camera } from './camera';
import { Scene } from './scene';
import { Renderer } from './renderer';

export class Controller {
  scene!: Scene;

  constructor(public renderer: Renderer, public camera: Camera) {
    this.scene = new Scene();
    this.scene.add(camera);

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
}
