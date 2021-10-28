import { ReplaySubject } from 'rxjs';
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
        switch (textureType) {
          case TextureType.DIFFUSE:
            material.map = tex;
            break;
          case TextureType.ROUGHNESS:
            material.roughnessMap = tex;
            break;
          case TextureType.NORMAL:
            tex.flipY = true;
            material.normalMap = tex;
            break;
          case TextureType.AO:
            material.aoMap = tex;
            break;
        }

        material.needsUpdate = true;
      });
    }

    return subject;
  }
}
