<script setup lang="ts">
import { ref, type Ref, defineProps, onMounted, watch } from 'vue';
import type Query from '@/services/Query';
import { useFilterableTableStore } from '@/store';
import { storeToRefs } from 'pinia';
import ActionButtons from '@/components/filterable-data-table/ActionButtons.vue';

const filterableTableStore = useFilterableTableStore();
const emit = defineEmits(['delete-action', 'edit-action']);

const { updateData, action } = storeToRefs(filterableTableStore);

interface IFilterableDataTableProps {
  service: Query;
  headers: [];
  customQuery?: object;
  actions?: string[];
}

const props = defineProps<IFilterableDataTableProps>();

const items: Ref<[]> = ref([]);
const search: Ref = ref('');
const loading: Ref<boolean> = ref(false);
const totalItems: Ref<number> = ref(0);
const lastPage: Ref<number> = ref(0);
const page: Ref<number> = ref(1);
const itemsPerPageOptions = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
];
const serverParams: Ref = ref({
  columnFilters: null,
  sort: [{ key: 'created_at', order: 'asc' }],
  page: 1,
  perPage: 10,
});

const updateParams = newProps => {
  serverParams.value = Object.assign(serverParams.value, newProps);
};

const onPageChange = params => {
  updateParams({ page: params });
  fetchData();
};

const onPerPageChange = params => {
  updateParams({ perPage: params });
  fetchData();
};

const onSortChange = params => {
  let newParams = params;
  if (params.length === 0) {
    newParams = [{ key: 'created_at', order: 'asc' }];
  }
  updateParams({ sort: newParams });
  fetchData();
};

const onButtonClick = item => {
  console.log('buton', item);
};

const fetchData = async () => {
  loading.value = true;
  let url = props.service
    .paginate(serverParams.value.page, serverParams.value.perPage)
    .sort(serverParams.value.sort[0].key, serverParams.value.sort[0].order);

  if (serverParams.value.columnFilters) {
    let query = Object.entries(serverParams.value.columnFilters)
      .map(entry => {
        return entry[0] + ',' + entry[1];
      })
      .join(',');
    url.parameter('columnFilters', query);
  }

  if (props.customQuery) {
    let queries = Object.entries(props.customQuery);
    queries.forEach(key => {
      url.parameter(key[0], key[1]);
    });
  }

  await url
    .table()
    .then(response => {
      items.value = response.data.data;
      totalItems.value = response.data.meta.total;
      lastPage.value = response.data.meta.last_page;
    })
    .catch(e => {
      console.log(e);
    })
    .finally(() => {
      loading.value = false;
      filterableTableStore.setLoading(false);
    });
};

onMounted(() => {
  fetchData();
});

watch(updateData, () => {
  fetchData();
});

watch(action, () => {
  if (action.value.status) {
    if (action.value.type === 'delete') {
      emit('delete-action', action.value.item);
      filterableTableStore.reset();
    }
    if (action.value.type === 'edit') {
      emit('edit-action', action.value.item);
      filterableTableStore.reset();
    }
  }
});
</script>

<template>
  <div>
    <v-data-table-server
      dense
      :loading="loading"
      loading-text="Loading"
      :headers="headers"
      :items="items"
      item-key="name"
      class="elevation-1"
      :search="search"
      :items-length="totalItems"
      :items-per-page-options="itemsPerPageOptions"
      :sort-by="serverParams.sort"
      :multi-sort="false"
      item-value="id"
      :page="page"
      @update:sort-by="onSortChange"
      @update:items-per-page="onPerPageChange"
      @update:page="onPageChange"
    >
      <template v-slot:item.actions="rows">
        <action-buttons
          v-if="props.actions"
          :item="rows"
          :actions="props.actions"
        ></action-buttons>
      </template>
    </v-data-table-server>
  </div>
</template>

<style scoped></style>
