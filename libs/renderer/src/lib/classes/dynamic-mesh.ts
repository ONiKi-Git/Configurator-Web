import { BufferGeometry, Euler, Mesh, MeshPhysicalMaterial } from 'three';

export class DynamicMesh {
  geometries: Map<string, BufferGeometry> = new Map<string, BufferGeometry>();

  constructor(public mesh: Mesh, euler: Euler = new Euler()) {
    this.mesh.rotation.copy(euler);
  }

  addOption(id: string, geometry: BufferGeometry) {
    this.geometries.set(id, geometry);
  }

  replaceGeometry(meshID: string) {
    if (this.geometries.has(meshID)) {
      this.mesh.geometry = this.geometries.get(meshID)!;
    } else {
      console.warn(`${meshID} was not found on ${this.mesh.name}.`);
    }
  }
}
