import { Component, OnInit } from '@angular/core';
import { replaceableMesh, TextureType } from '@torbenvanassche/threejswrapper';
import { Subject } from 'rxjs';
import * as THREE from 'three';
import { Group, Mesh, MeshPhysicalMaterial } from 'three';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurator';

  bulb: replaceableMesh;

  constructor(private configurator: ConfiguratorService) {}

  ngOnInit() {
    this.configurator.initialize();

    const material = new THREE.MeshPhysicalMaterial({
      transparent: true,
      //emissive: 0xccd627,
      emissive: 0xf9f9f9,
    });
    this.configurator.materialLibrary.add('ground', material);

    this.configurator.textureLibrary.load(
      'glass_albedo',
      'assets/meshes/LightBulb/textures/GLASS/Config_Lightbulb_V1_Bulb_Glass_BaseColor.png',
      TextureType.DIFFUSE,
      material
    );

    this.configurator.textureLibrary.load(
      'glass_roughness',
      'assets/meshes/LightBulb/textures/GLASS/Config_Lightbulb_V1_Bulb_Glass_Roughness.png',
      TextureType.ROUGHNESS,
      material
    );
  }

  changeColor(ev: any) {
    const m = this.configurator.materialLibrary.get('ground');
    if (m) {
      m.emissive = ev;
    }
  }

  changeBloomStrength(event: any) {
    this.configurator.controller.postProcess.setBloomParameters({
      strength: event.value,
    });
  }

  changeBloomRadius(event: any) {
    this.configurator.controller.postProcess.setBloomParameters({
      radius: event.value,
    });
  }

  async addCouch(data: Subject<Group>) {
    data.subscribe((x) => {
      this.configurator.controller.scene.add(x);
      x.traverse((mesh) => {
        if (mesh instanceof Mesh) {
          switch (mesh.name) {
            case 'Bulb_Glass':
              const mat = this.configurator.materialLibrary.get('ground');
              if (mat !== undefined)
                ((mesh as Mesh).material as MeshPhysicalMaterial) = mat;
              break;
            case 'Bulb_Metal_Fitting':
              ((mesh as Mesh).material as MeshPhysicalMaterial) =
                new MeshPhysicalMaterial({
                  color: 0x333333,
                  metalness: 1,
                  roughness: 0.5,
                  emissiveIntensity: 0,
                });
              break;
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
          this.configurator.controller.environment.texture.subscribe((x) => {
            ((mesh as Mesh).material as MeshPhysicalMaterial).envMap = x;
          });
        }
      });
    });
  }
}
