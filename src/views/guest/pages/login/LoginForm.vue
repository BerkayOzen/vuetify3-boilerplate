<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserSession } from '@/store/userSession';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';

const router = useRouter();
const route = useRoute();
const userSession = useUserSession();
const authService = new AuthService();
const userService = new UserService();

// import { useAuth } from 'vue-auth3';

// const auth = useAuth();

const username: Ref<string> = ref('');
const password: Ref<string> = ref('');
const errorMessages: Ref<string> = ref('Incorrect login info');
const snackbar: Ref<boolean> = ref(false);
const color: Ref<string> = ref('general');
const showPassword: Ref<boolean> = ref(false);

// Sends action to Vuex that will log you in and redirect to the dash otherwise, error

const login = async (): Promise<void> => {
  const credentials = {
    email: username.value,
    password: password.value,
  };
  try {
    await authService
      .login(credentials)
      .then(async response => {
        const token = response.data.access_token;
        await userSession.setToken(token);
      })
      .catch(e => {
        console.log('login_err', e);
      });
    await userService
      .me()
      .then(res => {
        const user = res.data;
        userSession.setUser(user);
        router.push('/dashboard');
      })
      .catch(e => {
        console.log('me_err', e);
      });
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <v-container fill-height>
    <v-row align-center justify-center>
      <v-col cols="24" lg="6" md="6" align-center justify-center>
        <v-card class="elevation-12">
          <v-toolbar color="general">
            <v-toolbar-title>Admin Panel</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                :rules="[
                  () =>
                    !!username ||
                    //$tc('validation.required', [$tc('common.email')]),
                    'validation.required',
                ]"
                prepend-icon="fas fa-user"
                label="$tc('login.email')"
                placeholder="I Am Iron Man"
                required
              />
              <v-text-field
                v-model="password"
                :rules="[
                  () =>
                    !!password ||
                    //$tc('validation.required', [$tc('common.password')]),
                    'validation.required',
                ]"
                :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="fas fa-lock"
                label="$tc('login.password')"
                placeholder="*J*A*R*V*I*S*"
                counter
                required
                @keydown.enter="login"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-divider class="mt-5" />
          <v-card-actions>
            <v-spacer />
            <v-btn align-center justify-center color="general" @click="login">
              login
            </v-btn>
          </v-card-actions>
          <v-snackbar v-model="snackbar" :color="color" :location="'top'">
            {{ errorMessages }}
            <v-btn variant="text" @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
