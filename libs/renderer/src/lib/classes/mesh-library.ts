import { ReplaySubject } from 'rxjs';
import { Group, LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface MeshData {
  group?: THREE.Group;
  url: string;
  name: string;
}

export class MeshLibrary {
  data: Set<MeshData> = new Set<MeshData>();

  constructor(private manager: LoadingManager) {
  }

  /**
   * Consider loading materials separate to reduce load times on meshes
   */
  load(
    name: string,
    url: string,
    progressEvent: (progress: number) => void = () => {}
  ) {
    var subject = new ReplaySubject<Group>();

    var array = Array.from(this.data).filter((x) => x.url === url);
    if (array.length == 0) {
      new GLTFLoader(this.manager)
        .loadAsync(url, (p) => {
          //multiplied by 100 for angular/material progressbar
          progressEvent((p.loaded / p.total) * 100);
        })
        .then((gltf) => {
          this.data.add({ group: gltf.scene, url: url, name: name });
          gltf.scene.name = name;
          subject.next(gltf.scene);
        });
    } else {
      subject.next(array[0].group);
    }

    return subject;
  }
}
