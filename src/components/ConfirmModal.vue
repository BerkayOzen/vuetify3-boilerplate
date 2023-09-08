<script setup lang="ts">
export interface IConfirmProps {
  dialog: boolean;
}

const props = withDefaults(defineProps<IConfirmProps>(), {
  dialog: false,
});

const emit = defineEmits(['update:dialog', 'cancel', 'confirm']);
const confirm = () => {
  emit('confirm', true);
  closeModal();
};
const cancel = () => {
  emit('cancel', true);
  closeModal();
};
const closeModal = () => {
  emit('update:dialog', false);
};
</script>
<template>
  <v-dialog
    v-model="props.dialog"
    persistent
    max-width="400"
    @keydown.esc="cancel"
    @keydown.enter="confirm"
  >
    <v-card>
      <v-card-title class="primary subheading text-uppercase white--text">
        <slot name="header" />
      </v-card-title>
      <v-card-text>
        <slot name="content" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn small color="error" @click="cancel">Disagree</v-btn>
        <v-btn small color="primary" @click="confirm">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
