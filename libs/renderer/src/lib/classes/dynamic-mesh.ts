import { BufferGeometry, Material, Mesh } from 'three';

export class DynamicMesh extends Mesh {
  geometries: Map<string, BufferGeometry> = new Map<string, BufferGeometry>();

  constructor(public geometry: BufferGeometry, public material: Material, name: string = "", options: Map<string, BufferGeometry> = new Map()) {
    super();

    this.name = name;
    this.geometries = options;
  }

  addOption(id: string, geometry: BufferGeometry) {
    this.geometries.set(id, geometry);
  }

  setOption(meshID: string) {
    if (this.geometries.has(meshID)) {
      this.geometry = this.geometries.get(meshID)!;
    } else {
      console.warn(`${meshID} was not found on ${this.name}.`);
    }
  }
}
