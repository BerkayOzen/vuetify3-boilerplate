<script setup lang="ts">
import GuestView from './GuestView.vue';
</script>

<template>
  <v-locale-provider>
    <v-app id="guest" class="pa-0" dark>
      <guest-view />
      <v-main class="ma-0 pt-16">
        <transition mode="out-in">
          <v-container fluid class="page-wrapper">
            <div class="maxWidth">
              <router-view />
            </div>
          </v-container>
        </transition>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<style scoped></style>
