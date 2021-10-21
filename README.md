# Getting Started
The below code snippet will set everything up and initialize the project. 
For angular this can be placed in the ngInit of a component.

Be aware that the `Renderer` will create a new WebGL canvas in the root of the HTML Document.\
You can change this by overriding the `domElement` of the `Renderer` class.

```typescript
const renderer = new Renderer(window.innerWidth, window.innerHeight)
const camera = new Camera(new THREE.Vector3(2, 2, 2), 75, renderer);
camera.addOrbitControls(false, true, true)
this.controller = new Controller(renderer, camera);
    
document.body.appendChild(this.controller.renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.name = "Cube";
this.controller.scene.add(cube);

const dirLight = new THREE.DirectionalLight(0xffa95c);
dirLight.name = "Directional Light";
dirLight.position.set(-1, 1, 1);
this.controller.scene.add(dirLight);

const ambientLight = new THREE.HemisphereLight(0xffeeb1, 0x080820);
ambientLight.name = "Ambient Light";
this.controller.scene.add(ambientLight);
```
