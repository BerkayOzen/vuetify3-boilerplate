<script setup lang="ts">
import UserService from '@/services/UserService';
import DateTime from '@/components/DateTime.vue';
import { router } from '@/router';

const userService = new UserService();

const user = {
  username: null,
  email: null,
  firstName: null,
  gender: null,
  birthday: '',
  lastName: null,
  password: null,
};
const genders = [
  { text: 'Null', value: 0 },
  { text: 'Male', value: 1 },
  { text: 'Female', value: 2 },
];
const createUsers = () => {
  userService
    .store(user)
    .then(response => {
      router.push({ name: 'admin.users.index' });
    })
    .catch(e => {
      console.log(e);
    });
};
</script>

<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8 offset-md4>
        <v-card
          color="general"
          title="Edit Profile"
          text="Complete your profile"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="user.username"
                    class="purple-input"
                    :label="$tc('user.username')"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="user.email"
                    :label="$tc('user.email')"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="user.firstName"
                    :label="$tc('user.firstName')"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="user.lastName"
                    :label="$tc('user.lastName')"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <date-time
                    v-model:date="user.birthday"
                    :label="$tc('user.birthday')"
                    :format="true"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    v-model="user.gender"
                    :items="genders"
                    class="purple-input"
                    :label="$tc('user.gender')"
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="user.password"
                    :label="$tc('user.password')"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="general"
                    @click="createUsers"
                  >
                    {{ $tc('user.createUser') }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped></style>
