import * as THREE from 'three';
import { MeshTransmissionMaterial } from '../MeshTransmissionMaterial';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let modelStar;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);


// CORRECT COLORING
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Tone mapping for better color balance
renderer.outputEncoding = THREE.sRGBEncoding;

// SHADOWS
//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

// ROTATE CAMERA
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
window.addEventListener('resize', onWindowResize);

// USER RESIZES WINDOW
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

camera.position.z = 5;

let physics;

scene.background = new THREE.Color(0xffffff); 

const geometry = new THREE.BoxGeometry(50, 9, 0.1);
const material = Object.assign(new MeshTransmissionMaterial(8), {

    clearcoatRoughness: 0,
    transmission: 0.99,
    chromaticAberration: 1.3,
    roughness: 0.3,
    thickness: 2,
    ior: 1.2,
    distortion: 0.3,
    distortionScale: 0.1,

});

const wall = new THREE.Mesh(geometry, material);

wall.userData.physics = { mass: 0 };
wall.position.z = 2;
scene.add(wall);




physics = await RapierPhysics();



const floor_geo = new THREE.BoxGeometry(200, 1, 200);
const floor_mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const floor = new THREE.Mesh(floor_geo, floor_mat);

floor.userData.physics = { mass: 0 };
floor.position.y = -5;
scene.add(floor);

// LEFT WALL
const wall1_geo = new THREE.BoxGeometry(1, 50, 100);
const wall1 = new THREE.Mesh(wall1_geo, floor_mat);

wall1.userData.physics = { mass: 0 };
wall1.position.x = -20;
scene.add(wall1);


// BOXES 
const boxes_geo = new THREE.BoxGeometry(2, 2, 2);
const boxes_mat = new THREE.MeshPhysicalMaterial({

});
const boxes = new THREE.InstancedMesh(boxes_geo, boxes_mat, 500);
boxes.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
boxes.userData.physics = { mass: 5, restitution: 0 };
scene.add(boxes);

const matrix = new THREE.Matrix4();

const colors = [0xecf737, 0x28e110, 0x00fffc, 0xd859f8];

for (let i = 0; i < boxes.count; i++) {

    const x = Math.random() * 20 - 10;
    const y = Math.random() * 200;
    const z = Math.random() * 20 - 23;

    matrix.setPosition(x, y, z);
    boxes.setMatrixAt(i, matrix);
    const randomColor = colors[Math.floor(Math.random() * 4)];
    boxes.setColorAt(i, new THREE.Color(randomColor));
}

physics.addScene(scene);

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x0012ff, 1);
pointLight.position.set(-1, -2, 3);
pointLight.castShadow = true;


const dirLight2 = new THREE.DirectionalLight(0xfff000, 5);
dirLight2.position.set(2, -5, 1);
scene.add(dirLight2);

const dirLight = new THREE.DirectionalLight(0x28e110, 8);
dirLight.position.set(1, 3, 0);
scene.add(dirLight);

const dirLight3 = new THREE.DirectionalLight(0x0090ff, 6);
dirLight3.position.set(1, 10, 10);
scene.add(dirLight3);


function animate() {

    renderer.render(scene, camera);

}