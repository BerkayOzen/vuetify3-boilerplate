<script setup lang="ts">
import LogoLight from '@/layouts/full/logo/LogoLight.vue';
const ecosystem = [
  {
    text: 'vuetify-loader',
    href: 'https://github.com/vuetifyjs/vuetify-loader',
  },
  {
    text: 'github',
    href: 'https://github.com/vuetifyjs/vuetify',
  },
  {
    text: 'awesome-vuetify',
    href: 'https://github.com/vuetifyjs/awesome-vuetify',
  },
];

const importantLinks = [
  {
    text: 'Documentation',
    href: 'https://vuetifyjs.com',
  },
  {
    text: 'Chat',
    href: 'https://community.vuetifyjs.com',
  },
  {
    text: 'Made with Vuetify',
    href: 'https://madewithvuejs.com/vuetify',
  },
  {
    text: 'Twitter',
    href: 'https://twitter.com/vuetifyjs',
  },
  {
    text: 'Articles',
    href: 'https://medium.com/vuetify',
  },
];
const whatNext = [
  {
    text: 'Explore components',
    href: 'https://vuetifyjs.com/components/api-explorer',
  },
  {
    text: 'Select a layout',
    href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
  },
  {
    text: 'Frequently Asked Questions',
    href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
  },
];
</script>

<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <logo-light />
        <!--
        <v-img
          :src="require('@/assets/img/getir_logo_dark.png')"
          class="my-3"
          contain
          height="200"
        />
        -->
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Taşeron Takip Sistemi</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
