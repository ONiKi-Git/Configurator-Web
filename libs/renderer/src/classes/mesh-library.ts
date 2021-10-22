import { ReplaySubject } from 'rxjs';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface MeshData {
  mesh?: THREE.Group;
  url: string;
  name: string;
}

export class MeshLibrary {
  data: Set<MeshData> = new Set<MeshData>();

  /**
   * Consider loading materials separate to reduce load times on meshes
   */
  load(name: string, url: string) {
    var subject = new ReplaySubject<Group>();

    var array = Array.from(this.data).filter((x) => x.url === url);
    if (array.length == 0) {
      new GLTFLoader().load(
        url,
        (gltf) => {
          this.data.add({ mesh: gltf.scene, url: url, name: name });
          subject.next(gltf.scene);
        },
        undefined,
        (e) => {
          console.log(e);
        }
      );
    } else {
      subject.next(array[0].mesh);
    }
  }
}
