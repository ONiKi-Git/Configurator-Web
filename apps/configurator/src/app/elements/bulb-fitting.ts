import { Subject } from 'rxjs';
import { Euler, Mesh, MeshPhysicalMaterial } from 'three';
import { ConfiguratorService } from '../configurator.service';

export class BulbFitting extends Mesh {
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
    return new MeshPhysicalMaterial({
      color: 0x333333,
      metalness: 1,
      roughness: 0.5,
      emissiveIntensity: 0,
    });
  }
}
