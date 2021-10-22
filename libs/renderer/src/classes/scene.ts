import * as THREE from 'three';

export class Scene extends THREE.Scene {
  data: Map<string, THREE.Object3D> = new Map<string, THREE.Object3D>();

  constructor() {
    super();
    
    this.lighting();
  }

  private lighting() {
    const dirLight = new THREE.DirectionalLight(0xffa95c);
    dirLight.name = 'Directional Light';
    dirLight.castShadow = true;
    dirLight.position.set(-1, 1, 1);
    this.add(dirLight);

    const ambientLight = new THREE.HemisphereLight(0xffeeb1, 0x080820);
    ambientLight.name = 'Ambient Light';
    this.add(ambientLight);
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
