import { ReplaySubject } from 'rxjs';
import * as THREE from 'three';
import { LoadingManager, Texture, TextureLoader } from 'three';

interface TextureData {
  texture?: THREE.Texture;
  url: string;
  name: string;
}

export enum TextureType {
  DIFFUSE,
  ROUGHNESS,
  NORMAL,
  METAL,
  AO,
}

export class TextureLibrary {
  data: Set<TextureData> = new Set<TextureData>();
  loader!: TextureLoader;

  constructor(private loadingManager?: LoadingManager) {
    this.loader = new TextureLoader(this.loadingManager);
  }

  load(
    name: string,
    url: string,
    textureType: TextureType,
    material?: THREE.MeshPhysicalMaterial
  ) {
    var subject = new ReplaySubject<Texture>();

    var array = Array.from(this.data).filter((x) => x.url === url);
    if (array.length == 0) {
      this.loader.load(
        url,
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          this.data.add({ texture: texture, url: url, name: name });
          subject.next(texture);
        },
        undefined,
        (e) => {
          console.log(e);
        }
      );
    } else {
      subject.next(array[0].texture);
    }

    if (material) {
      subject.subscribe((tex) => {
        tex.flipY = false;
        switch (textureType) {
          case TextureType.DIFFUSE:
            material.map = tex;
            break;
          case TextureType.ROUGHNESS:
            material.roughnessMap = tex;
            break;
          case TextureType.NORMAL:
            material.normalMap = tex;
            break;
          case TextureType.AO:
            material.aoMap = tex;
            break;
          case TextureType.METAL:
            material.metalnessMap = tex;
            break;
        }

        material.needsUpdate = true;
      });
    }

    return subject;
  }
}
