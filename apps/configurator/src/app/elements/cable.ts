import { Subject } from 'rxjs';
import * as THREE from 'three';
import { Mesh } from 'three';
import { ConfiguratorService } from '../configurator.service';

export class Cable {
  loadProgress: Subject<number> = new Subject();
  mesh: Mesh = new Mesh();

  constructor(private configurator: ConfiguratorService, url: string) {

    console.log(this.configurator);

    this.configurator
      .loadModel(url, (p) => {
        this.loadProgress.next(p);
      })
      .subscribe((group) => {
        group.traverse((x) => {
          this.mesh.copy(x as Mesh);
          this.mesh.material = this.setMaterial();
        });
      });
  }

  private setMaterial() {
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x333333,
    });

    return glass;
  }
}
