import * as THREE from 'three';

export class Renderer extends THREE.WebGLRenderer {
  constructor(width: number, height: number) {
    super();

    this.setSize(width, height);
  }
}
