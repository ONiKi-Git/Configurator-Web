import { ReplaySubject } from 'rxjs';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface MeshData {
  group?: THREE.Group;
  url: string;
  name: string;
}

export class MeshLibrary {
  data: Set<MeshData> = new Set<MeshData>();

  /**
   * Consider loading materials separate to reduce load times on meshes
   */
  async load(name: string, url: string, progressEvent: (progress: number) => void = () => {}) {
    var subject = new ReplaySubject<Group>();

    var array = Array.from(this.data).filter((x) => x.url === url);
    if (array.length == 0) {
      let gltf = await new GLTFLoader().loadAsync(url, (p) => {
        //multiplied by 100 for angular/material progressbar
        progressEvent((p.loaded / p.total) * 100);
      });
      this.data.add({ group: gltf.scene, url: url, name: name });
      gltf.scene.name = name;
      subject.next(gltf.scene);
    } else {
      subject.next(array[0].group);
    }

    return subject;
  }
}
