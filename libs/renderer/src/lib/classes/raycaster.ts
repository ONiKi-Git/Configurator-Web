import { Controller } from './controller';
import * as THREE from 'three';
import { Vector2 } from 'three';

export class RaycastHandler extends THREE.Raycaster {
  mousePosition: Vector2 = new Vector2();

  constructor(private controller: Controller) {
    super();
    controller.renderer.domElement.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp = (event: any) => {
    this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.camera = this.controller.camera;
    this.setFromCamera(this.mousePosition, this.controller.camera);
    const intersects = this.intersectObjects(
      this.controller.scene.children,
      true
    );

    if (intersects.length !== 0) console.log(intersects[0].object.name);
  };
}
