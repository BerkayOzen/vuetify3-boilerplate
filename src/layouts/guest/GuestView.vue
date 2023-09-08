<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from './vertical-sidebar/NavGroup.vue';
import NavItem from './vertical-sidebar/NavItem.vue';
import Logo from '../full/logo/Logo.vue';
import GuestSidebar from './vertical-sidebar/index.vue';
import GuestHeader from './vertical-header/index.vue';
// Icon Imports
import { Menu2Icon } from 'vue-tabler-icons';
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
</script>

<template>
  <!------Header-------->
  <guest-header />
  <!------Sidebar-------->
  <guest-sidebar />
</template>
