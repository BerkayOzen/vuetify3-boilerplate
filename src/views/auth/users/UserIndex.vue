<script setup lang="ts">
import UserService from '@/services/UserService';
import FilterableDataTable from '@/components/filterable-data-table/FilterableDataTable.vue';
import { computed } from 'vue';
import { useUserStore } from '@/store';
import { router } from '@/router';

const userService = new UserService();
const userStore = useUserStore();

const tableActions = ['edit'];

const headers = computed(() => [
  {
    title: '',
    key: 'photos',
    sortable: false,
    width: '5%',
  },
  {
    title: 'User Name',
    key: 'username',
    sortable: true,
    width: '30%',
  },
  {
    title: 'E-Mail',
    key: 'email',
    sortable: true,
    width: '30%',
  },
  {
    title: 'Actions',
    key: 'actions',
    width: '20%',
    align: 'right',
    sortable: false,
  },
]);

const editUser = user => {
  userStore.setIsEdit(true);
  router.push({
    name: 'admin.users.show',
    params: { userId: user.id },
  });
};
</script>
<template>
  <v-container fluid>
    <div class="user-index">
      <filterable-data-table
        :headers="headers"
        :service="userService"
        :actions="tableActions"
        @edit-action="editUser"
      ></filterable-data-table>
    </div>
  </v-container>
</template>

<style scoped></style>
