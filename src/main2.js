import * as THREE from 'three';
import { MeshTransmissionMaterial } from '../MeshTransmissionMaterial';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
			import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
			import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
			import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { render } from '@react-three/fiber';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


//const controls = new OrbitControls( camera, renderer.domElement );
//controls.update();
window.addEventListener('resize', onWindowResize);

//const postprocessing = {};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //postprocessing.composer.setSize( width, height );
}

renderer.setClearColor( 0xffffff, 0);



//initPostprocessing();

const normalMapTexture = new THREE.TextureLoader().load('./assets/normal.png');
//normalMapTexture.wrapS = new THREE.RepeatWrapping;
//normalMapTexture.wrapT = new THREE.RepeatWrapping;
//normalMapTexture.repeat.set(options.normalRepeat, options.normalRepeat);

const geometry = new THREE.BoxGeometry( 6,6,0.1 );
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
    chromaticAberration: 0.01,
    transmission: 0.95,
    thickness: 2,
    roughness: 0.1,
    ior: 1.2,
    //envMap: hdrEquirect,
    //envMapIntensity: options.envMapIntensity,
    //clearcoat: options.clearcoat,
    //clearcoatRoughness: options.clearcoatRoughness,
    
    normalMap: normalMapTexture,
    normalScale: new THREE.Vector2(3,3),
    clearcoatNormalScale: 1,
  

});

// normalMapTexture

const cube = new THREE.Mesh( geometry, material );

cube.position.z = 0.5;
scene.add( cube );

// Load a single texture
const loader = new THREE.TextureLoader();
const texture = loader.load('./assets/wood1.png');

// Define the cube geometry
const cube2_geo = new THREE.BoxGeometry(2, 2, 2);

// Create a material with the texture applied to all sides
const cube2_mat = new THREE.MeshBasicMaterial({ map: texture });

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
const ambientLight = new THREE.AmbientLight(0xfffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xfffff, 10); 
pointLight.position.set(2, 3, 4); 
scene.add(pointLight);


const pointLight2 = new THREE.PointLight(0xFFA500, 100); 
pointLight2.position.set(-1, -1, 1); 
scene.add(pointLight2);

/*
function initPostprocessing() {

  const renderPass = new RenderPass( scene, camera );

  const bokehPass = new BokehPass( scene, camera, {
    focus: 3.9,
    aperture: 0.05,
    maxblur: 0.02
  } );

  const outputPass = new OutputPass();

  const composer = new EffectComposer( renderer );

  composer.addPass( renderPass );
  composer.addPass( bokehPass );
  composer.addPass( outputPass );

  postprocessing.composer = composer;
  postprocessing.bokeh = bokehPass;

}

composer = new THREE.EffectComposer(renderer);

renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

// Bokeh
bokehPass = new THREE.BokehPass(scene, camera, {
  focus: 0.1,
  aperture: 0.005,
  maxblur: 3,
  width: window.innerWidth,
  height: window.innerHeight
});

bokehPass.renderToScreen = true;

composer.addPass(bokehPass);

renderer.autoClear = false;


*/

function animate() {

	cube2.rotation.x += 0.01;
	cube2.rotation.y += 0.01;


	renderer.render( scene, camera );

  //renderThis();
}
/*
function renderThis() {
  
  postprocessing.composer.render( 0.1);

}*/