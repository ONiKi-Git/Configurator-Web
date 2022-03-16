import * as THREE from 'three';

export class Scene extends THREE.Scene {
  data: Map<string, THREE.Object3D> = new Map<string, THREE.Object3D>();

  constructor() {
    super();

    this.lighting();
  }

  private lighting() {
    const dirLight = new THREE.SpotLight(0xffa95c, 1);
    dirLight.name = 'Directional Light';
    dirLight.castShadow = true;
    dirLight.position.set(1, 1, 1);
    dirLight.shadow.mapSize = new THREE.Vector2(512, 512);
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 3;
    this.add(dirLight);

    this.add(new THREE.CameraHelper(dirLight.shadow.camera))

    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x080820, 2);
    ambientLight.name = 'Ambient Light';
    this.add(ambientLight);
  }

  add(...object: THREE.Object3D[]) {
    object.forEach((element) => {
      if (element.name === '') {
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
