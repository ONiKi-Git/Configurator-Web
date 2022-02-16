import { Component, OnInit } from '@angular/core';
import { DynamicMesh, TextureType } from '@torbenvanassche/threejswrapper';
import * as THREE from 'three';
import {
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
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
              this.configurator.materialLibrary.get('BODY_BASIC')!,
              new Vector3(0, 0, 0)
            );
            this.body.scale.setScalar(0.01);
            this.body.addOption('Body_Basic', {
              geometry: mesh.geometry,
              material: this.configurator.materialLibrary.get('BODY_BASIC')!,
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
                  material:
                    this.configurator.materialLibrary.get('BODY_STRONG')!,
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
              this.configurator.materialLibrary.get('LEGS_ROLLER')!,
              new Vector3(0, -0.32, 0)
            );
            this.legs.scale.setScalar(0.01);
            this.legs.addOption('Legs_Roller', {
              geometry: mesh.geometry,
              material: this.configurator.materialLibrary.get('LEGS_ROLLER')!,
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
              material: this.configurator.materialLibrary.get("LEGS_LONG")!,
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
              material: this.configurator.materialLibrary.get("LEGS_SHORT")!,
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
                  material: this.configurator.materialLibrary.get('LIGHT_B')!,
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
                  material: this.configurator.materialLibrary.get('LIGHT_C')!,
                  offset: new Vector3(0, 0.28, 0),
                });
              }
            });
          });
      });
  }

  setupMaterials() {
    let basePath = 'assets/textures/';

    this.configurator.materialLibrary.create(
      'LIGHT_A',
      basePath + 'Seperate_Light_A/',
      [
        {
          path: 'LIGHT_A_Base_Color.PNG',
          textureType: TextureType.DIFFUSE,
        },
        {
          path: 'LIGHT_A_Metallic.PNG',
          textureType: TextureType.METAL,
        },
        {
          path: 'LIGHT_A_Opacity.png',
          textureType: TextureType.OPACITY,
        },
        {
          path: 'LIGHT_A_Emissive.PNG',
          textureType: TextureType.EMISSIVE,
        },
        {
          path: 'LIGHT_A_Roughness.PNG',
          textureType: TextureType.ROUGHNESS,
        },
      ],
      { refractionRatio: 0.985, envMapIntensity: 0.9, clearcoat: 1, ior: 0.9 }
    );

    this.configurator.materialLibrary.create(
      'LIGHT_B',
      basePath + 'Seperate_Light_B/',
      [
        {
          path: 'LIGHT_B_Base_Color.PNG',
          textureType: TextureType.DIFFUSE,
        },
        {
          path: 'LIGHT_B_Metallic.PNG',
          textureType: TextureType.METAL,
        },
        {
          path: 'LIGHT_B_Opacity.png',
          textureType: TextureType.OPACITY,
        },
        {
          path: 'LIGHT_B_Emissive.PNG',
          textureType: TextureType.EMISSIVE,
        },
        {
          path: 'LIGHT_B_Roughness.PNG',
          textureType: TextureType.ROUGHNESS,
        },
      ],
      { refractionRatio: 0.985, envMapIntensity: 0.9, clearcoat: 1, ior: 0.9 }
    );

    this.configurator.materialLibrary.create(
      'LIGHT_C',
      basePath + 'Seperate_Light_C/',
      [
        {
          path: 'LIGHT_C_Base_Color.PNG',
          textureType: TextureType.DIFFUSE,
        },
        {
          path: 'LIGHT_C_Metallic.PNG',
          textureType: TextureType.METAL,
        },
        {
          path: 'LIGHT_C_Opacity.PNG',
          textureType: TextureType.OPACITY,
        },
        {
          path: 'LIGHT_C_Emissive.PNG',
          textureType: TextureType.EMISSIVE,
        },
        {
          path: 'LIGHT_C_Roughness.PNG',
          textureType: TextureType.ROUGHNESS,
        },
      ],
      { refractionRatio: 0.985, envMapIntensity: 0.9, clearcoat: 1, ior: 0.9 }
    );

    this.configurator.materialLibrary.create(
      'BODY_BASIC',
      basePath + 'Seperate_Body_Basic/',
      [
        {
          path: 'BODY_BASIC_Base_Color.png',
          textureType: TextureType.DIFFUSE,
          srgb: true,
        },
        {
          path: 'BODY_BASIC_Metallic.png',
          textureType: TextureType.METAL,
        },
        {
          path: 'BODY_BASIC_Normal.png',
          textureType: TextureType.NORMAL,
        },
        {
          path: 'BODY_BASIC_Roughness.png',
          textureType: TextureType.ROUGHNESS,
        },
      ]
    );

    this.configurator.materialLibrary.create(
      'BODY_STRONG',
      basePath + 'Seperate_Body_Strong/',
      [
        {
          path: 'BODY_STRONG_Base_Color.png',
          textureType: TextureType.DIFFUSE,
          srgb: true,
        },
        {
          path: 'BODY_STRONG_Metallic.png',
          textureType: TextureType.METAL,
        },
        {
          path: 'BODY_STRONG_Normal.png',
          textureType: TextureType.NORMAL,
        },
        {
          path: 'BODY_STRONG_Roughness.png',
          textureType: TextureType.ROUGHNESS,
        },
      ]
    );

    this.configurator.materialLibrary.create(
      'LEGS_ROLLER',
      basePath + 'Seperate_Legs_Roller/',
      [
        {
          path: 'LEGS_ROLLER_Base_Color.png',
          textureType: TextureType.DIFFUSE,
          srgb: true,
        },
        {
          path: 'LEGS_ROLLER_Metallic.png',
          textureType: TextureType.METAL,
        },
        {
          path: 'LEGS_ROLLER_Normal.png',
          textureType: TextureType.NORMAL,
        },
        {
          path: 'LEGS_ROLLER_Roughness.png',
          textureType: TextureType.ROUGHNESS,
        },
      ]
    );

    this.configurator.materialLibrary.create(
      'LEGS_SHORT',
      basePath + 'Seperate_Legs_Short/',
      [
        {
          path: 'LEGS_SHORT_Base_Color.png',
          textureType: TextureType.DIFFUSE,
          srgb: true,
        },
        {
          path: 'LEGS_SHORT_Metallic.png',
          textureType: TextureType.METAL,
        },
        {
          path: 'LEGS_SHORT_Normal.png',
          textureType: TextureType.NORMAL,
        },
        {
          path: 'LEGS_SHORT_Roughness.png',
          textureType: TextureType.ROUGHNESS,
        },
      ]
    );
    
    this.configurator.materialLibrary.create(
      'LEGS_LONG',
      basePath + 'Seperate_Legs_Long/',
      [
        {
          path: 'LEGS_LONG_Base_Color.png',
          textureType: TextureType.DIFFUSE,
          srgb: true,
        },
        {
          path: 'LEGS_LONG_Metallic.png',
          textureType: TextureType.METAL,
        },
        {
          path: 'LEGS_LONG_Normal.png',
          textureType: TextureType.NORMAL,
        },
        {
          path: 'LEGS_LONG_Roughness.png',
          textureType: TextureType.ROUGHNESS,
        },
      ]
    );
  }

  setupRobot() {
    this.initBody();
    this.initHead();
    this.initLegs();
  }  

  ngOnInit() {
    this.configurator.initialize(new Vector3(-0.8, 1.1, 1));

    this.setupRobot();
    this.setupMaterials();

    this.configurator.controller.raycaster.result.subscribe(x => {
      console.log(x);
    })
  }
}
