import { TextureType } from '@torbenvanassche/threejswrapper';
import { DynamicMesh } from 'libs/renderer/src/lib/classes/dynamic-mesh';
import { Subject } from 'rxjs';
import * as THREE from 'three';
import { Euler, Mesh, Vector3 } from 'three';
import { ConfiguratorService } from '../configurator.service';

export class BulbGlass extends DynamicMesh {
  loadProgress: Subject<number> = new Subject();

  constructor(private configurator: ConfiguratorService, url: string) {
    super();

    this.createMaterial();

    this.configurator
      .loadModel(url, (p) => {
        this.loadProgress.next(p);
      })
      .subscribe((group) => {
        group.traverse((x) => {
          this.material = this.configurator.materialLibrary.get('glass')!;
          this.rotation.copy(new Euler(Math.PI, 0, 0));
          this.position.add(new Vector3(0, 0, 0.1));
          this.geometry = (x as Mesh).geometry;
          this.addOption('default', this.geometry);
        });
      });
  }

  createMaterial() {
    const glass = new THREE.MeshPhysicalMaterial({
      transparent: true,
      emissive: 0xf9f9f9,
    });
    this.configurator.materialLibrary.add('glass', glass);
    this.configurator.textureLibrary.load(
      'glass_albedo',
      'assets/textures/glass/Config_Lightbulb_V1_Bulb_Glass_BaseColor.png',
      TextureType.DIFFUSE,
      glass
    );

    this.configurator.textureLibrary.load(
      'glass_roughness',
      'assets/textures/glass/Config_Lightbulb_V1_Bulb_Glass_Roughness.png',
      TextureType.ROUGHNESS,
      glass
    );
  }

  changeColor(ev: any) {
    const m = this.configurator.materialLibrary.get('glass');
    if (m) {
      m.emissive = ev;
    }
  }
}
