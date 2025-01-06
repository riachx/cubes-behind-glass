import * as THREE from 'three';
import { MeshTransmissionMaterial } from '../MeshTransmissionMaterial';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { render } from '@react-three/fiber';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


renderer.toneMapping = THREE.ACESFilmicToneMapping; // Tone mapping for better color balance
renderer.outputEncoding = THREE.sRGBEncoding; 


 
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();
window.addEventListener('resize', onWindowResize);


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
}

renderer.setClearColor( 0xffffff, 0);

const normalMapTexture = new THREE.TextureLoader().load('./assets/normal.png');
//normalMapTexture.wrapS = new THREE.RepeatWrapping;
//normalMapTexture.wrapT = new THREE.RepeatWrapping;
//normalMapTexture.repeat.set(options.normalRepeat, options.normalRepeat);

const geometry = new THREE.BoxGeometry( 4,4,0.1);
const material = Object.assign(new MeshTransmissionMaterial(8), {
    
  /*clearcoatRoughness: 0,
  transmission: 0.99,
  chromaticAberration: 0.01,
  //anisotropy: 0,
  // Set to > 0 for diffuse roughness
  roughness: 0.1,
  thickness: 10,
  ior: 1.2,
  envMapIntensity: 50,
  bloomstrength:0,
  distortion: 0.5,
  distortionScale: 20,*/
  clearcoat: 1,
    chromaticAberration: 0.0,
    transmission: 0.95,
    thickness: 0.5,
    roughness: 0.0,
    ior: 1.2,
    //envMap: hdrEquirect,
    //envMapIntensity: options.envMapIntensity,
    //clearcoat: options.clearcoat,
    //clearcoatRoughness: options.clearcoatRoughness,
    
    normalMap: normalMapTexture,
    normalScale: new THREE.Vector2(4,4),
    clearcoatNormalScale: 10,
  

});

// normalMapTexture

const cube = new THREE.Mesh( geometry, material );

cube.position.z = 2;
scene.add( cube );

// Load a single texture
const loader = new THREE.TextureLoader();
const texture = loader.load('./assets/wood1.png');

// Define the cube geometry
const cube2_geo = new THREE.BoxGeometry(2, 2, 2);

// Create a material with the texture applied to all sides
const cube2_mat = new THREE.MeshStandardMaterial({ map: texture, 
    roughness: 0.7, 
    metalness: 0.1 
});

// Create the cube mesh and add it to the scene
const cube2 = new THREE.Mesh(cube2_geo, cube2_mat);
scene.add(cube2);


const geometry2 = new THREE.SphereGeometry(1, 32, 32);
const material2 = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometry2, material2 );
sphere.position.x = 1
scene.add( sphere );

camera.position.z = 5;

// LIGHTS
const ambientLight = new THREE.AmbientLight(0xffe9db, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffe9db, 10); 
pointLight.position.set(2, 3, 4); 
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xFFA500, 10); 
pointLight2.position.set(-1, -5, 0); 
scene.add(pointLight2);

const directionalLight = new THREE.DirectionalLight(0xFFA500, 9); 
directionalLight.position.set(1, 1, 0); 
scene.add(directionalLight);



function animate() {

	cube2.rotation.x += 0.01;
	cube2.rotation.y += 0.01;


	renderer.render( scene, camera );

}