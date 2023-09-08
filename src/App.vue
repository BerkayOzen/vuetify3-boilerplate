<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useConfig } from '@/store';
import { useTheme } from 'vuetify';
import UserService from '@/services/UserService';
import { router } from '@/router';

const userService = new UserService();

const theme = useTheme();
const configStore = useConfig();

const validateUser = () => {
  userService
    .me()
    .then(res => console.log('res', res))
    .catch(e => {
      if (e.response.status === 401)
        router.push({
          name: 'guest.login',
        });
      console.log('err', e);
    });
};
validateUser();

const isDark = computed(() => (configStore.theme ? 'dark' : 'light'));
</script>
<template>
  <v-app :theme="isDark">
    <router-view />
  </v-app>
</template>
