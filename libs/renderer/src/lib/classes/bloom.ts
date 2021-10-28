import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import {
  Vector2,
  ShaderMaterial,
  Scene,
  Mesh,
  MeshPhysicalMaterial,
} from 'three';
import { Updateable, Renderer, Camera, BloomParams} from '@torbenvanassche/threejswrapper';

export class Bloom implements Updateable {
  private bloomComposer!: EffectComposer;
  finalComposer!: EffectComposer;

  private bloomPass!: UnrealBloomPass;

  constructor(
    private renderer: Renderer,
    private scene: Scene,
    private camera: Camera,
    bloom: Partial<BloomParams> = { strength: 2, radius: 1 }
  ) {
    const renderScene = new RenderPass(scene, camera);
    this.bloomPass = new UnrealBloomPass(
      new Vector2(renderer.domElement.width, renderer.domElement.height),
      bloom.strength!,
      bloom.radius!,
      0
    );

    this.bloomComposer = new EffectComposer(renderer);
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.addPass(renderScene);
    this.bloomComposer.addPass(this.bloomPass);

    const finalPass = new ShaderPass(
      new ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
        },
        vertexShader:
          'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}',
        fragmentShader:
          'uniform sampler2D baseTexture; uniform sampler2D bloomTexture; varying vec2 vUv; void main() { gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );}',
        defines: {},
      }),
      'baseTexture'
    );
    finalPass.needsSwap = true;

    this.finalComposer = new EffectComposer(renderer);
    this.finalComposer.addPass(renderScene);
    this.finalComposer.addPass(finalPass);
  }

  setBloomStrength(str: number) {
    this.bloomPass.strength = str;
  }

  setBloomRadius(radius: number) {
    this.bloomPass.radius = radius;
  }

  update() {
    this.camera.layers.disableAll();
    this.renderer.setClearColor(0x000000);

    let shouldRender = false;
    this.scene.traverse((x) => {
      if (
        x instanceof Mesh &&
        x.material instanceof MeshPhysicalMaterial &&
        x.material.emissiveIntensity !== 0
      ) {
        x.layers.set(2);
        shouldRender = true;
      }
    });

    if (shouldRender) {
      this.camera.layers.enable(2);
      this.bloomComposer.render();
    }
  }
}
