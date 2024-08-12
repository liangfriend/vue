<template>
  <div><div ref="canvas"></div></div>
</template>
<script setup lang="ts">
  import { ref, onMounted, reactive, Ref } from 'vue';
  import * as THREE from 'three';
  import { ArcballControls } from 'three/examples/jsm/Addons.js';

  const canvas: Ref = ref(null);
  const load = () => {
    //场景
    const scene = new THREE.Scene();
    //相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    //渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //几何信息
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //材质信息
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //物体
    const cube = new THREE.Mesh(geometry, material);
    //控制器设置
    const controls = new ArcballControls(camera, renderer.domElement, scene);
    //场景添加
    scene.add(cube);

    //dom添加
    canvas.value.appendChild(renderer.domElement);
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
