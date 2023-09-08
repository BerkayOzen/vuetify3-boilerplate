<script setup lang="ts">
import { useGlobal } from '@/store';
const globalStore = useGlobal();
import LogoLight from '@/layouts/full/logo/LogoLight.vue';
import ProfileDD from '@/layouts/auth/vertical-header/ProfileDD.vue';
import NotificationDD from '@/layouts/full/vertical-header/NotificationDD.vue';
</script>

<template>
  <v-app-bar class="main-header" elevation="0" height="70">
    <v-btn class="mx-1" icon @click="globalStore.toggleDrawer">
      <v-icon style="font-size: 28px" theme="dark">fas fa-bars</v-icon>
    </v-btn>
    <div class="pa-5">
      <LogoLight />
    </div>
    <NotificationDD />
    <div class="d-flex align-center justify-space-between w-100">
      <div></div>
      <div>
        <ProfileDD />
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped></style>
