import { Component, OnInit } from '@angular/core';
import { DynamicMesh, TextureType } from '@torbenvanassche/threejswrapper';
import {
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
} from 'three';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'oniki-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'configurator';

  opened: boolean;

  body: DynamicMesh;
  head: DynamicMesh;
  legs: DynamicMesh;

  constructor(public configurator: ConfiguratorService) {}

  initBody() {
    this.configurator.meshLibrary
      .load('Body_Basic', 'assets/meshes/Seperate_Body_Basic.gltf')
      .subscribe((object) => {
        //Get the loaded geometry
        object.traverse((mesh) => {
          if (mesh instanceof Mesh) {
            this.body = new DynamicMesh(
              mesh.geometry,
              new MeshStandardMaterial(),
              new Vector3(0, 0, 0)
            );
            this.body.scale.setScalar(0.01);
            this.body.addOption('Body_Basic', {
              geometry: mesh.geometry,
              material: new MeshStandardMaterial(),
              offset: new Vector3(0, 0, 0),
            });
          }
        });

        //add it to the scene
        if (this.body) {
          this.configurator.controller.scene.add(this.body);
        }

        //add alterative options
        this.configurator.meshLibrary
          .load('Body_Strong', 'assets/meshes/Seperate_Body_Strong.gltf')
          .subscribe((object) => {
            object.traverse((mesh) => {
              if (mesh instanceof Mesh) {
                this.body.addOption('Body_Strong', {
                  geometry: mesh.geometry,
                  material: new MeshStandardMaterial(),
                  offset: new Vector3(0, 0, 0),
                });
              }
            });
          });
      });
  }

  initLegs() {
    this.configurator.meshLibrary
      .load('Legs_Roller', 'assets/meshes/Seperate_Legs_Roller.gltf')
      .subscribe((object) => {
        //Get the loaded geometry
        object.traverse((mesh) => {
          if (mesh instanceof Mesh) {
            this.legs = new DynamicMesh(
              mesh.geometry,
              new MeshStandardMaterial(),
              new Vector3(0, -0.32, 0)
            );
            this.legs.scale.setScalar(0.01);
            this.legs.addOption('Legs_Roller', {
              geometry: mesh.geometry,
              material: new MeshStandardMaterial(),
              offset: new Vector3(0, -0.32, 0),
            });
          }
        });

        //add it to the scene
        if (this.legs) {
          this.configurator.controller.scene.add(this.legs);
        }
      });

    //add alterative options
    this.configurator.meshLibrary
      .load('Legs_Long', 'assets/meshes/Seperate_Legs_Long.gltf')
      .subscribe((object) => {
        object.traverse((mesh) => {
          if (mesh instanceof Mesh) {
            this.legs.addOption('Legs_Long', {
              geometry: mesh.geometry,
              material: new MeshStandardMaterial(),
              offset: new Vector3(0, -0.58, 0),
            });
          }
        });
      });

    this.configurator.meshLibrary
      .load('Legs_Short', 'assets/meshes/Seperate_Legs_Short.gltf')
      .subscribe((object) => {
        object.traverse((mesh) => {
          if (mesh instanceof Mesh) {
            this.legs.addOption('Legs_Short', {
              geometry: mesh.geometry,
              material: new MeshStandardMaterial(),
              offset: new Vector3(0, -0.32, 0),
            });
          }
        });
      });
  }

  initHead() {
    this.configurator.meshLibrary
      .load('Light_A', 'assets/meshes/Seperate_Light_A.gltf')
      .subscribe((object) => {
        //Get the loaded geometry
        object.traverse((mesh) => {
          if (mesh instanceof Mesh) {
            this.head = new DynamicMesh(
              mesh.geometry,
              this.configurator.materialLibrary.get('LIGHT_A')!,
              new Vector3(0, 0.28, 0)
            );

            this.head.rotation.set(MathUtils.degToRad(-10), 0, 0);
            this.head.scale.setScalar(0.01);
            this.head.addOption('Light_A', {
              geometry: mesh.geometry,
              material: this.configurator.materialLibrary.get('LIGHT_A')!,
              offset: new Vector3(0, 0.28, 0),
            });
          }
        });

        //add it to the scene
        if (this.head) {
          this.configurator.controller.scene.add(this.head);
        }

        //add alterative options
        this.configurator.meshLibrary
          .load('Light_B', 'assets/meshes/Seperate_Light_B.gltf')
          .subscribe((object) => {
            object.traverse((mesh) => {
              if (mesh instanceof Mesh) {
                this.head.addOption('Light_B', {
                  geometry: mesh.geometry,
                  material: new MeshPhysicalMaterial(),
                  offset: new Vector3(0, 0.28, 0),
                });
              }
            });
          });

        this.configurator.meshLibrary
          .load('Light_C', 'assets/meshes/Seperate_Light_C.gltf')
          .subscribe((object) => {
            object.traverse((mesh) => {
              if (mesh instanceof Mesh) {
                this.head.addOption('Light_C', {
                  geometry: mesh.geometry,
                  material: new MeshPhysicalMaterial(),
                  offset: new Vector3(0, 0.28, 0),
                });
              }
            });
          });
      });
  }

  setupMaterials() {
    let basePath = 'assets/textures/';

    var lightA = new MeshPhysicalMaterial();
    this.configurator.textureLibrary.load(
      'Light_A_DIFFUSE',
      basePath + 'Seperate_Light_A/LIGHT_A_Base_Color.PNG',
      TextureType.DIFFUSE,
      lightA
    );
    this.configurator.textureLibrary.load(
      'Light_A_METALLIC',
      basePath + 'Seperate_Light_A/LIGHT_A_Metallic.PNG',
      TextureType.METAL,
      lightA
    );
    this.configurator.textureLibrary.load(
      'Light_A_OPACITY',
      basePath + 'Seperate_Light_A/LIGHT_A_Opacity.png',
      TextureType.OPACITY,
      lightA
    );
    this.configurator.textureLibrary.load(
      'Light_A_EMISSIVE',
      basePath + 'Seperate_Light_A/LIGHT_A_Emissive.PNG',
      TextureType.EMISSIVE,
      lightA
    );
    this.configurator.textureLibrary.load(
      'Light_A_ROUGHNESS',
      basePath + 'Seperate_Light_A/LIGHT_A_Roughness.PNG',
      TextureType.ROUGHNESS,
      lightA
    );
    this.configurator.materialLibrary.add('LIGHT_A', lightA);
    this.configurator.controller.environment.texture.subscribe((x) => {
      lightA.envMap = x;
    });

    lightA.refractionRatio = 0.985;
    lightA.envMapIntensity = 0.9;
    lightA.clearcoat = 1;
    lightA.ior = 0.9;
  }

  ngOnInit() {
    this.configurator.initialize(new Vector3(-0.8, 1.1, 1));

    this.setupMaterials();

    this.initBody();
    this.initHead();
    this.initLegs();
  }
}
