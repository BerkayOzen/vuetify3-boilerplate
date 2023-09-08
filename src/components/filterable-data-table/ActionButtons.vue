<script setup lang="ts">
import ConfirmModal from '@/components/ConfirmModal.vue';
import { ref, type Ref } from 'vue';
import { useFilterableTableStore } from '@/store';
import { storeToRefs } from 'pinia';

const filterableTableStore = useFilterableTableStore();

const { loading } = storeToRefs(filterableTableStore);
export interface IActionProps {
  actions: string[];
  item: object;
}

const props = defineProps<IActionProps>();
const confirmDialog: Ref = ref(false);

const isDelete = item => {
  return item && item === 'delete';
};
const isEdit = item => {
  return item && item === 'edit';
};

const deleteItem = () => {
  let action = {
    status: true,
    type: 'delete',
    item: { ...props.item.item.raw },
  };
  filterableTableStore.setAction(action);
};
const editItem = () => {
  let action = {
    status: true,
    type: 'edit',
    item: { ...props.item.item.raw },
  };
  filterableTableStore.setAction(action);
};
</script>
<template>
  <div class="ma-0 pa-0">
    <div
      v-for="(action, key) in props.actions"
      :key="key"
      class="text-xs-right"
      style="display: inline"
    >
      <v-tooltip v-if="isDelete(action)" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="isDelete(action)"
            :disabled="loading"
            text
            icon
            @click="confirmDialog = true"
          >
            <v-icon small>fas fa-trash-alt</v-icon>
          </v-btn>
        </template>
        <span>Delete</span>
      </v-tooltip>
      <v-tooltip v-if="isEdit(action)" bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="isEdit(action)"
            :disabled="loading"
            icon
            text
            @click="editItem"
          >
            <v-icon small>fas fa-edit</v-icon>
          </v-btn>
        </template>
        <span>Edit</span>
      </v-tooltip>
    </div>
    <confirm-modal
      v-model:dialog="confirmDialog"
      @cancel="confirmDialog = false"
      @confirm="deleteItem"
    >
      <template v-slot:header>Confirm</template>

      <template v-slot:content>Confirm</template>
    </confirm-modal>
  </div>
</template>

<style scoped></style>
