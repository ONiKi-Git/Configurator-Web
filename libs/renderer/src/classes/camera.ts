import { Vector3, PerspectiveCamera } from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Renderer } from "./renderer";

export class Camera extends PerspectiveCamera {
    orbitControls!: OrbitControls;

    constructor(position: Vector3, fov: number, private renderer: Renderer, target: Vector3 = new Vector3(), nearClipping?: number, farClipping?: number) {
        super(fov, renderer.domElement.width / renderer.domElement.height, nearClipping, farClipping);
        this.position.set(position.x, position.y, position.z);
        this.name = "Perspective camera";
        this.lookAt(target)
    }

    addOrbitControls(pan: boolean = false, rotate: boolean = false, zoom: boolean = false, autoRotate: boolean = false, autoRotateSpeed: number = 0) {
        this.orbitControls = new OrbitControls(this, this.renderer.domElement);
    
        this.orbitControls.enablePan = pan;
        this.orbitControls.enableRotate = rotate;
        this.orbitControls.enableZoom = zoom;

        this.orbitControls.autoRotate = autoRotate;
        this.orbitControls.autoRotateSpeed = autoRotateSpeed;
    }
}