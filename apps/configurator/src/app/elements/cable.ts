import { Subject } from 'rxjs';
import * as THREE from 'three';
import { Mesh } from 'three';
import { ConfiguratorService } from '../configurator.service';

export class Cable extends Mesh {
  loadProgress: Subject<number> = new Subject();

  constructor(private configurator: ConfiguratorService, url: string) {
    super();

    this.configurator
      .loadModel(url, (p) => {
        this.loadProgress.next(p);
      })
      .subscribe((group) => {
        group.traverse((x) => {
          (this as Mesh).copy(x as Mesh);
          this.material = this.setMaterial();
        });
      });
  }

  private setMaterial() {
    const glass =  new THREE.MeshPhysicalMaterial({
      color: 0x333333
    });

    return glass;
  }
}
