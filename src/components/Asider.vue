<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" default-active="2" text-color="#fff">
    <template v-for="item in menu.children">
      <template v-if="item.children?.length">
        <el-sub-menu :key="item.path" :index="item.path">
          <template #title>{{ item.meta?.title }}</template>
          <el-menu-item @click="select" v-for="subitem in item.children" :key="subitem.path" :index="subitem.path">
            {{ subitem?.meta?.title }}
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item @click="select" :key="item.path" :index="item.path">
          {{ item?.meta?.title }}
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import {ref} from 'vue';

import {MenuItemRegistered} from 'element-plus';
import {useRouter} from 'vue-router';

const props = defineProps(['route']);
const router = useRouter();
const menu = ref(props.route);

const select = (e: MenuItemRegistered) => {
  const path = e.index;
  router.push(path);
};
</script>
<style scoped>
.el-menu {
  height: 100%;
}
</style>
