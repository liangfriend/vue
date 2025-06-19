<template>
  <div ref="containerRef" class="three-container"></div>
</template>

<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref, watch} from 'vue';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Props
const props = defineProps<{
  modelUrl: string;
  width?: number;
  height?: number;
}>();

// Refs
const containerRef = ref<HTMLDivElement | null>(null);

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let animationId: number;
let model: THREE.Object3D | null = null;

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  camera = new THREE.PerspectiveCamera(45, getAspect(), 0.1, 1000);
  camera.position.set(0, 1, 5);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 20, 0);
  scene.add(light);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 20, 10);
  scene.add(directionalLight);

  const container = containerRef.value!;
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(props.width || 400, props.height || 300);
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 50;

  loadModel();
  animate();
}

function getAspect() {
  const w = props.width || 400;
  const h = props.height || 300;
  return w / h;
}

function loadModel() {
  const loader = new GLTFLoader();
  loader.load(
      props.modelUrl,
      (gltf) => {
        if (model) scene.remove(model);
        model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
  );
}

function animate() {
  animationId = requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function dispose() {
  cancelAnimationFrame(animationId);
  renderer.dispose();
  scene.clear();
}

onMounted(() => {
  initScene();
});

onBeforeUnmount(() => {
  dispose();
});

watch(() => props.modelUrl, () => {
  loadModel();
});
</script>

<style scoped>
.three-container {
  
}
</style>
