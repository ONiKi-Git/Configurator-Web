import { Subject } from 'rxjs';
import { Euler, Mesh, MeshPhysicalMaterial } from 'three';
import { ConfiguratorService } from '../configurator.service';

export class BulbInternal extends Mesh {
  loadProgress: Subject<number> = new Subject();

  constructor(private configurator: ConfiguratorService, url: string) {
    super();

    this.configurator
      .loadModel(url, (p) => {
        this.loadProgress.next(p);
      })
      .subscribe((group) => {
        group.traverse((x) => {
          this.setMaterial(x as Mesh);

          (x as Mesh).rotation.copy(new Euler(-Math.PI / 2, 0, 0));
          this.configurator.controller.scene.add(x as Mesh);
        });
      });
  }

  private setMaterial(mesh: Mesh): void {
    switch (mesh.name) {
      case 'Bulb_Glassmechanism_Inside':
        ((mesh as Mesh).material as MeshPhysicalMaterial) =
          new MeshPhysicalMaterial({
            color: 0x222222,
            roughness: 0.5,
            emissiveIntensity: 0,
          });
        break;
      case 'Bulb_Wireholder_V1':
        ((mesh as Mesh).material as MeshPhysicalMaterial) =
          new MeshPhysicalMaterial({
            color: 0x000000,
            metalness: 1,
            roughness: 0.5,
            emissiveIntensity: 0,
          });
        break;
      case 'Bulb_Wire_V1':
        ((mesh as Mesh).material as MeshPhysicalMaterial) =
          new MeshPhysicalMaterial({
            color: 0x555555,
            emissiveIntensity: 0,
          });
        break;
    }
  }
}
