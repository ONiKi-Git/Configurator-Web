import { BufferGeometry, Euler, Mesh, MeshPhysicalMaterial } from 'three';

export class DynamicMesh extends Mesh {
  geometries: Map<string, BufferGeometry> = new Map<string, BufferGeometry>();

  constructor(
    geometry?: BufferGeometry,
    material?: MeshPhysicalMaterial,
    euler: Euler = new Euler()
  ) {
    super(geometry, material);
    this.rotation.copy(euler);
  }

  addOption(id: string, geometry: BufferGeometry) {
    this.geometries.set(id, geometry);
  }

  replaceGeometry(meshID: string) {
    if (this.geometries.has(meshID)) {
      this.geometry = this.geometries.get(meshID)!;
    } else {
      console.warn(`${meshID} was not found on ${this.name}.`);
    }
  }
}
