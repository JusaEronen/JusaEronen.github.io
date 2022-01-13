import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js'

//Scene, camera & renderer
const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load("./images/space.jpg");
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(15, 5, 0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#bg"), antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);


//Lights
const ambientLight = new THREE.AmbientLight(0x888888);
const directionalLight = new THREE.DirectionalLight(0xfdfcf0, 1);
directionalLight.position.set(30, -20, -45);
scene.add(ambientLight, directionalLight);

//Earth
const earthGeometry = new THREE.SphereGeometry(10, 50, 50);
const earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./images/earth.jpg"),
    normalMap: new THREE.TextureLoader().load("./images/earthNormalMap.jpg"),
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 15
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(0,0,0);

//Clouds
const cloudGeometry = new THREE.SphereGeometry(10.1, 50, 50);
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./images/clouds.jpg"),
    transparent: true,
    opacity: 0.15
})
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);

scene.add(earth, clouds);
//Moon
const moonGeometry = new THREE.SphereGeometry(1.5, 50, 50);
const moonMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("./images/moon.jpg")
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(35, 0, 0);

//Values for moon orbit
var r = 35;
var theta = 0;
var dTheta = 2 * Math.PI / 1500;
scene.add(moon)


//Controls
//const controls = new OrbitControls(camera, renderer.domElement);

//2D Grid
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

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
    earth.rotateY(0.0005);
    clouds.rotateY(0.00025);

    //Moon orbit
    theta += dTheta;
    moon.position.x = r * Math.cos(theta);
    moon.position.z = r * Math.sin(theta);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
canvasResizeToDisplay(true);
requestAnimationFrame(animate);