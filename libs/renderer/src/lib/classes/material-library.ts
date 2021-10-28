export class MaterialLibrary {
    private data: Map<string, THREE.MeshPhysicalMaterial> = new Map<string, THREE.MeshPhysicalMaterial>();

    add(name: string, material: THREE.MeshPhysicalMaterial) {
        this.data.set(name, material);
        return material;
    }

    get(name: string) {
        return this.data.get(name);
    }
}