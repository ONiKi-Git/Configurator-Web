import { MeshPhysicalMaterial, MeshPhysicalMaterialParameters } from 'three';
import { Controller } from './controller';
import { TextureLibrary, TextureType } from './texture-library';

export interface TextureData {
  textureType: TextureType;
  path: string;
  srgb?: boolean;
}

export class MaterialLibrary {
  private data: Map<string, THREE.MeshPhysicalMaterial> = new Map<
    string,
    THREE.MeshPhysicalMaterial
  >();

  constructor(
    private controller: Controller,
    private textureLibrary: TextureLibrary
  ) {}

  add(name: string, material: THREE.MeshPhysicalMaterial) {
    this.data.set(name, material);
    return material;
  }

  get(name: string) {
    return this.data.get(name);
  }

  create(
    name: string,
    basePath: string,
    textures: TextureData[],
    params?: MeshPhysicalMaterialParameters
  ) {
    const material = new MeshPhysicalMaterial(params);
    material.name = name;
    textures.forEach((element) => {
      const path = `${basePath}${element.path}`;

      //regex get file name without extension
      var name = path.match(/^.*?([^\\/.]*)[^\\/]*$/)![1];
      this.textureLibrary.load(
        name,
        `${basePath}${element.path}`,
        element.textureType,
        material,
        element.srgb
      );
    });
    this.controller.environment.texture.subscribe((x) => {
      material.envMap = x;
    });

    this.add(name, material);
  }
}
