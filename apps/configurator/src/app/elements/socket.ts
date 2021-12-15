import { TextureType } from '@torbenvanassche/threejswrapper';
import { Subject } from 'rxjs';
import * as THREE from 'three';
import { Mesh, Vector3, Group } from 'three';
import { ConfiguratorService } from '../configurator.service';

export class Socket extends Mesh {
  loadProgress: Subject<number> = new Subject();

  constructor(private configurator: ConfiguratorService, url: string) {
    super();

    this.configurator
      .loadModel(url, (p) => {
        this.loadProgress.next(p);
      })
      .subscribe((group) => {
        group.traverse((x) => {
          let mesh = x as Mesh;

          this.add(mesh);
          this.configurator.controller.scene.add(this);
          this.rotateX(Math.PI / 4);
          this.position.add(new Vector3(0, 0.1, 0));
        });

        console.log(this.children);
        (this.children[3] as Mesh).material = this.setKnurled();
      });
  }

  private setKnurled() {
    const glass = new THREE.MeshPhysicalMaterial({});

    this.configurator.textureLibrary.load(
      'copper_albedo',
      'assets/textures/copper/INC_Socket_Socket_Knurled_Copper_BaseColor.png',
      TextureType.DIFFUSE,
      glass
    );

    this.configurator.textureLibrary.load(
      'copper_roughness',
      'assets/textures/copper/INC_Socket_Socket_Knurled_Copper_Roughness.png',
      TextureType.ROUGHNESS,
      glass
    );

    this.configurator.textureLibrary.load(
      'copper_roughness',
      'assets/textures/copper/INC_Socket_Socket_Knurled_Copper_Metallic.png',
      TextureType.METAL,
      glass
    );

    this.configurator.textureLibrary.load(
      'copper_roughness',
      'assets/textures/copper/INC_Socket_Socket_Knurled_Copper_Normal.png',
      TextureType.NORMAL,
      glass
    );

    return glass;
  }
}
