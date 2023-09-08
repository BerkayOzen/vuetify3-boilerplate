<script setup lang="ts">
import { Menu2Icon } from 'vue-tabler-icons';
import { useGlobal } from '@/store';
const globalStore = useGlobal();
import LogoLight from '@/layouts/full/logo/LogoLight.vue';
</script>

<template>
  <v-app-bar class="main-header" elevation="0" height="70">
    <v-btn class="mx-1" icon @click="globalStore.toggleDrawer">
      <v-icon style="font-size: 28px" theme="dark">fas fa-bars</v-icon>
    </v-btn>
    <div class="pa-5">
      <LogoLight />
    </div>
    <div class="d-flex align-center justify-space-between w-100">
      <div></div>
      <div>
        <v-btn to="/guest/login" color="primary" variant="outlined" block>
          Login
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped></style>
