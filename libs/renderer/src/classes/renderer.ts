import * as THREE from 'three';

export class Renderer extends THREE.WebGLRenderer {
  constructor(width: number, height: number, antialias: boolean = true, toneMapping: THREE.ToneMapping = THREE.ACESFilmicToneMapping) {
    super({antialias: antialias});

    this.setSize(width, height);
    this.shadowMap.enabled = true;
    this.toneMapping = toneMapping;
  }
}
