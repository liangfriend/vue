<template>
  <div><div ref="canvas"></div></div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive, Ref } from 'vue';
  import * as THREE from 'three';
  import { ArcballControls, EXRLoader, GLTFLoader, Rhino3dmLoader } from 'three/examples/jsm/Addons.js';
  import lemon from '../assets/lemon_4k.gltf';
  const canvas: Ref = ref(null);
  const load = () => {
    //场景
    const scene = new THREE.Scene();
    //相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 0.5;
    //渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //控制器设置
    const controls = new ArcballControls(camera, renderer.domElement, scene);

    //dom添加
    canvas.value.appendChild(renderer.domElement);
    //加载模型
    const loader = new GLTFLoader();

    loader.load(
      lemon, // 模型文件的路径
      (gltf) => {
        // 成功加载模型
        scene.add(gltf.scene);
        gltf.scene.scale.set(2, 2, 2); // 根据需要调整模型大小
        gltf.scene.position.set(0, 0, 0); // 根据需要设置模型位置

        // 遍历模型中的所有子对象
        // gltf.scene.traverse((child) => {
        //   if ((child as THREE.Mesh).isMesh) {
        //     const mesh = child as THREE.Mesh;
        //     mesh.material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // 设置一个基础颜色的材质
        //   }
        // });
      },
      undefined,
      (error) => {
        console.error('An error happened:', error);
      }
    );
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040, 100); // 环境光
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100); // 点光源
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    //渲染函数
    function animate() {
      renderer.render(scene, camera);
    }
    //渲染
    renderer.setAnimationLoop(animate);
  };

  onMounted(() => {
    load();
  });
</script>
<style scoped></style>
