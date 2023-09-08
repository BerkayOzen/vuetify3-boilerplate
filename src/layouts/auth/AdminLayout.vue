<script setup lang="ts">
import { RouterView } from 'vue-router';
// import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
// import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import AdminView from '@/layouts/auth/AdminView.vue';
</script>

<template>
  <v-locale-provider>
    <v-app id="admin" class="pa-0" dark>
      <!-- <VerticalSidebarVue />
            <VerticalHeaderVue  /> -->
      <admin-view />
      <v-main class="ma-0 pt-16">
        <transition mode="out-in">
          <v-container fluid class="page-wrapper">
            <div class="maxWidth">
              <RouterView />
            </div>
          </v-container>
        </transition>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
