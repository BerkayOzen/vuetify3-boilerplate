<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    max-width="290px"
    min-width="290px"
    offset-y
    transition="scale-transition"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="initialDateFormatted"
        :label="label"
        readonly
        prepend-icon="fas fa-calendar-alt"
        :error-messages="errorMessages"
        clearable
        @click:clear="clear"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-if="showOnlyFuture"
      v-model="initialDate"
      :min="today"
      :locale="$vuetify.lang.current"
      no-title
      :disabled="disabled"
      @input="menu = false"
    />
    <v-date-picker
      v-else-if="!!(minDate || maxDate)"
      v-model="initialDate"
      :min="minDate"
      :max="maxDate"
      :locale="$vuetify.lang.current"
      no-title
      :disabled="disabled"
      @input="menu = false"
    />
    <v-date-picker
      v-else
      v-model="initialDate"
      :locale="$vuetify.lang.current"
      no-title
      :disabled="disabled"
      @input="menu = false"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'DateTime',
  props: {
    date: {
      type: String,
      default: null,
    },
    maxDate: {
      type: String,
      required: false,
      default: undefined,
    },
    minDate: {
      type: String,
      required: false,
      default: undefined,
    },
    label: {
      type: String,
      default: 'Tarih',
    },
    showOnlyFuture: {
      type: Boolean,
      required: false,
      default: false,
    },
    format: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: String,
      default: '',
    },
    initialDateProps: {
      type: String,
      required: false,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initialDate: null,
      initialDateFormatted: null,
      menu: false,
    };
  },
  computed: {
    today() {
      let today = new Date().toLocaleDateString('tr');
      let [day, month, year] = today.split('.');

      return `${year}-${month}-${day}`;
    },
  },
  watch: {
    initialDate() {
      if (this.format)
        this.initialDateFormatted = this.formatDate(this.initialDate);
      else this.initialDateFormatted = this.initialDate;

      this.$emit('update:date', this.initialDate);
    },
    initialDateProps() {
      if (this.initialDateProps) {
        this.initialDateFormatted = this.formatDate(this.initialDateProps);
      }
    },
  },
  mounted() {
    if (this.format && this.date) {
      if (this.date.includes('.')) {
        let parse = this.date.split('.');
        let day = parse[0];
        let month = parse[1];
        let year = parse[2];
        this.initialDate = `${year}-${month}-${day}`;
      } else this.initialDate = this.date;
    } else this.initialDate = this.date;
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      let [year, month, day] = [];
      if (date.includes('.')) [day, month, year] = date.split('.');
      else [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
    clear() {
      this.$emit('update:date', null);
    },
  },
};
</script>
