import { Mesh, BufferGeometry } from "three";

export class replaceableMesh extends Mesh{
    geometries: Map<string, BufferGeometry> = new Map<string, BufferGeometry>();

    constructor() {
        super();
    }

    replace(id: string) {
        if(this.geometries.has(id)){
            this.geometry = this.geometries.get(id)!;
        }
    }


}