<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import AuthService from '@/services/AuthService';
import { useUserSession } from '@/store';
import { router } from '@/router';

const authService = new AuthService();
const userSession = useUserSession();

const logout = async () => {
  await authService
    .logout()
    .then(async res => {
      console.log('logout', res);
      await userSession.logoutUser();
      await router.push({
        name: 'guest.login',
      });
    })
    .catch(e => console.log(e));
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        class="profileBtn custom-hover-primary"
        variant="text"
        v-bind="props"
        icon
      >
        <v-avatar size="35">
          <img
            src="@/assets/images/users/avatar-1.jpg"
            height="35"
            alt="user"
          />
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
      <v-list class="py-0" lines="one" density="compact">
        <v-list-item value="item1" base-color="primary">
          <template v-slot:prepend>
            <UserIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">
            My Profile
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="item2" base-color="primary">
          <template v-slot:prepend>
            <MailIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">
            My Account
          </v-list-item-title>
        </v-list-item>
        <v-list-item value="item3" base-color="primary">
          <template v-slot:prepend>
            <ListCheckIcon stroke-width="1.5" size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">
            My Task
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <div class="pt-4 pb-4 px-5 text-center">
        <v-btn color="primary" variant="outlined" block @click="logout">
          Logout123
        </v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>
