import * as THREE from 'three';

export class Scene extends THREE.Scene {
  data: Map<string, THREE.Object3D> = new Map<string, THREE.Object3D>();

  constructor() {
    super();
  }

  add(...object: THREE.Object3D[]) {
    object.forEach((element) => {
      if (element.name === "") {
        console.warn(
          `${element.uuid} is missing a name, but will still be added.`
        );
      } else {
        this.data.set(element.name, element);
      }
      super.add(element);
    });

    return this;
  }

  remove(...object: THREE.Object3D[]) {
    object.forEach((element) => {
      if (element.name !== undefined) {
      } else {
        if (this.data.has(element.name)) {
          this.data.delete(element.name);
        }
      }
      super.remove(element);
    });

    return this;
  }
}
