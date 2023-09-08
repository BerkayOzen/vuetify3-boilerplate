<template>
    <v-container fluid>
        <v-card>
            <v-toolbar flat>
                <v-toolbar-title>{{ $tc('role.title') }}</v-toolbar-title>
                <v-spacer/>
                <v-btn
                    class="mx-0 font-weight-light"
                    color="general"
                    @click="openCreateAndEditPage"
                >
                    {{ $tc('role.create') }}
                </v-btn>
            </v-toolbar>
        </v-card>
        <div class="agency-index">
            <filterable-data-table
                :headers="headers"
                :service="service"
                :from="'domain'"
                :custom-query="tableQuery"
                @edit-action="editRole"
            />
        </div>
    </v-container>
</template>

<script>

import FilterableDataTable from "@/views/components/filterable-data-table/FilterableDataTable";
import RoleService from "../../../../services/api/RoleService";

export default {
    name: "RoleIndex",
    components: {
        FilterableDataTable,
    },
    data() {
        return {
            service: new RoleService,
            tableQuery: null,
            showCrateAndEditModal: false,

            // options
            pagination: {
                descending: false,
                page: 1,
                rowsPerPage: 10, // -1 for All
                sortBy: 'name',
                totalItems: 0,
            },
            rowsPerPageItems: [10, 25, 50, 100],
        }
    },
    computed: {
        headers() {
            return [
                {
                    label: this.$tc('common.name'),
                    field: 'description',
                    type: 'text',
                    sortable: true,
                    filterable: true,
                    width: '70%',
                },
                {
                    label: this.$tc('common.actions'),
                    field: 'actions',
                    sortable: false,
                    filterable: false,
                    width: '10%',
                    align: 'right',
                    actions: ['edit']
                }
            ];
        },
    },
    methods: {
        editRole(role) {
            this.$store.dispatch('role/setEditing', true);
            this.$store.dispatch('role/setEditItem', role);
            this.showCrateAndEditModal = true;
        },
        openCreateAndEditPage() {
            this.$router.push({name: 'admin.roles.create'});
        }
    },
}
</script>

<style scoped>

</style>