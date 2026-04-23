<template>
  <!-- web-ar, 启动https服务，用手机浏览器打开 -->
  <div class="web-ar-page">
    <div v-if="!libsReady" class="web-ar-engine-hint">正在加载 AR 引擎…</div>
    <template v-else>
      <div class="arjs-loader" v-show="showLoader">
        <div>Loading, please wait...</div>
      </div>
      <a-scene
          vr-mode-ui="enabled: false;"
          renderer="logarithmicDepthBuffer: true;"
          embedded
          class="ar-scene"
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
      >
        <!-- NFT：需 public 下 complicated.fset / .fset3 / .iset，url 为站点根路径前缀 -->
        <a-nft
            type="nft"
            :url="nftUrlPrefix"
            smooth="true"
            smoothCount="10"
            smoothTolerance=".01"
            smoothThreshold="5"
        >
          <a-entity
              :gltf-model="harmonicaModelUrl"
              scale="5 5 5"
              position="50 150 0"
          />
        </a-nft>
        <a-entity camera/>
      </a-scene>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, onBeforeUnmount, onMounted, ref} from 'vue';
import harmonicaUrl from './harmonica.gltf';

const AFRAME_SRC = 'https://cdn.jsdelivr.net/npm/aframe@1.6.0/dist/aframe-master.min.js';
const ARJS_NFT_SRC = 'https://cdn.jsdelivr.net/npm/@ar-js-org/ar.js@3.4.8/aframe/build/aframe-ar-nft.js';

const libsReady = ref(false);
const showLoader = ref(true);
const harmonicaModelUrl = harmonicaUrl;

const nftUrlPrefix = computed(() => {
  const base = import.meta.env.BASE_URL || '/';
  const normalized = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${normalized || ''}/complicated`;
});

let onVideoLoaded: (() => void) | null = null;

function loadScriptOnce(src: string): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existing) {
    return existing.dataset.loaded === '1'
        ? Promise.resolve()
        : new Promise((resolve, reject) => {
          existing.addEventListener('load', () => resolve(), {once: true});
          existing.addEventListener('error', () => reject(new Error(src)), {once: true});
        });
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = () => {
      s.dataset.loaded = '1';
      resolve();
    };
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

onMounted(async () => {
  try {
    if (!(window as unknown as { AFRAME?: unknown }).AFRAME) {
      await loadScriptOnce(AFRAME_SRC);
    }
    await loadScriptOnce(ARJS_NFT_SRC);
    libsReady.value = true;
    await nextTick();
    onVideoLoaded = () => {
      showLoader.value = false;
    };
    window.addEventListener('arjs-video-loaded', onVideoLoaded);
  } catch (e) {
    console.error(e);
  }
});

onBeforeUnmount(() => {
  if (onVideoLoaded) {
    window.removeEventListener('arjs-video-loaded', onVideoLoaded);
  }
});
</script>

<style scoped>
.web-ar-page {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 120px);
}

.web-ar-engine-hint {
  padding: 16px;
  color: #606266;
}

.ar-scene {
  width: 100%;
  height: min(85vh, 720px);
}

.arjs-loader {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arjs-loader div {
  text-align: center;
  font-size: 1.25em;
  color: white;
}
</style>
