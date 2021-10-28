import { UnsignedByteType, PMREMGenerator, Texture } from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { from, ReplaySubject } from 'rxjs';
import { Renderer } from '@torbenvanassche/threejswrapper';

export class Environment {
    texture: ReplaySubject<Texture> = new ReplaySubject();

    constructor(renderer: Renderer, url: string) {
        const pmremGenerator = new PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
    
        from(
          new EXRLoader()
            .setDataType(UnsignedByteType)
            .loadAsync(url)
        ).subscribe((texture) => {
          let exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
          this.texture.next(exrCubeRenderTarget.texture);
        });
    }
}