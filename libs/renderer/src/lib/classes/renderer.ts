import * as THREE from 'three';

export class Renderer extends THREE.WebGLRenderer {
  constructor(
    width: number,
    height: number,
    toneMapping: THREE.ToneMapping = THREE.ReinhardToneMapping
  ) {
    super();

    this.setPixelRatio(window.devicePixelRatio);
    this.setSize(width, height);
    this.shadowMap.enabled = true;
    this.toneMapping = toneMapping;
    //this.physicallyCorrectLights = true;
  }
}
