import { Controller } from './controller';
import * as THREE from 'three';
import { Vector2 } from 'three';
import { Subject } from 'rxjs';

export class RaycastHandler extends THREE.Raycaster {
  mousePosition: Vector2 = new Vector2();
  result: Subject<THREE.Object3D> = new Subject<THREE.Object3D>();

  constructor(private controller: Controller) {
    super();
    controller.renderer.domElement.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseUp = (event: any) => {
    this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.camera = this.controller.camera;
    this.setFromCamera(this.mousePosition, this.controller.camera);
    const intersects = this.intersectObjects(
      this.controller.scene.children,
      true
    );
    
    if (intersects.length !== 0) {
      this.result.next(intersects[0].object);
    }
  };
}
