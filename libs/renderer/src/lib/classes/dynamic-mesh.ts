import { Subject } from 'rxjs';
import { BufferGeometry, Material, Mesh, Vector3, Box3Helper } from 'three';

interface MeshInfo {
  geometry: BufferGeometry;
  material: Material;
  offset?: Vector3;
}

export class DynamicMesh extends Mesh {
  geometries: Map<string, MeshInfo> = new Map<string, MeshInfo>();
  options: Array<string> = [];

  initialized: Subject<string[]> = new Subject();

  constructor(
    public geometry: BufferGeometry,
    public material: Material,
    position: Vector3,
    rotation: Vector3,
    name: string = '',
  ) {
    super();

    this.name = name;
    this.position.set(position.x, position.y, position.z);
    this.rotation.setFromVector3(rotation);

    this.geometry.computeBoundingBox();

    this.castShadow = true;
    this.receiveShadow = true;
  }

  addOption(id: string, meshInfo: MeshInfo) {
    this.geometries.set(id, meshInfo);
    this.options = [...this.geometries.keys()];

    this.initialized.next(this.options);
  }

  setOption(meshID: string) {
    if (this.geometries.has(meshID)) {
      const entry = this.geometries.get(meshID)!;

      this.geometry = entry.geometry;
      this.material = entry.material;

      if(entry.offset === undefined) {
        entry.offset = new Vector3();
      }
      this.position.set(entry.offset.x, entry.offset.y, entry.offset.z);

    } else {
      console.warn(`${meshID} was not found on ${this.name}.`);
    }
  }
}
