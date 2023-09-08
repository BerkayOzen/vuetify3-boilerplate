<script setup lang="ts">
import sidebarItems from './sidebarItem';
import NavItem from './NavItem.vue';
import { computed, shallowRef } from 'vue';
import { useGlobal } from '@/store';
import NavGroup from './NavGroup.vue';

const globalStore = useGlobal();

const drawer = computed({
  get: () => globalStore.drawer,
  set: () => globalStore.toggleDrawer,
});

const sidebarMenu = shallowRef(sidebarItems);
// const sDrawer = ref(true);
const sidebarWidth = 240;
const sidebarMinWidth = 96;
</script>

<template>
  <v-navigation-drawer
    left
    elevation="0"
    app
    class="leftSidebar"
    v-model="drawer"
    :rail="!drawer"
    :width="sidebarWidth"
    :rail-width="sidebarMinWidth"
  >
    <div>
      <perfect-scrollbar class="scrollnavbar">
        <v-list class="pa-6">
          <template v-for="(item, i) in sidebarMenu">
            <NavGroup :item="item" v-if="item.header" :key="item.title" />
            <v-divider v-else-if="item.divider" :key="i" dark class="my-2" />
            <NavItem :item="item" v-else class="leftPadding" />
          </template>
        </v-list>
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>
</template>

<style scoped></style>
