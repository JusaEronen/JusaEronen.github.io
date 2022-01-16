import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js'

//Controls
//const controls = new OrbitControls(camera, renderer.domElement);

//Scene, camera & renderer
const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load("./images/space.jpg");
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(20, 5, 0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#bg"), antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);


//Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, -80);
scene.add(directionalLight);

//Earth
const earthGeometry = new THREE.SphereGeometry(10, 50, 50);
const earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./images/earth.jpg"),
    normalMap: new THREE.TextureLoader().load("./images/normalMap.png"),
    specularMap: new THREE.TextureLoader().load("./images/specularMap.png"),
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 5
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(0,0,0);
earth.rotateZ(-0.35)

//Clouds
const cloudGeometry = new THREE.SphereGeometry(10.1, 50, 50);
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./images/clouds.jpg"),
    depthWrite: false,
    transparent: true,
    opacity: 0.5
});
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
clouds.position.set(0,0,0);

scene.add(earth, clouds);

//Resize canvas on display resize
function canvasResizeToDisplay(force) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (force || canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}

function animate() {
    
    canvasResizeToDisplay();

    //Earth rotation
   earth.rotateY(0.00010);
    clouds.rotateY(0.00005);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
canvasResizeToDisplay(true);
requestAnimationFrame(animate);