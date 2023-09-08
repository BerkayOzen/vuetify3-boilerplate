<template>
    <v-container fluid>
        <v-card>
            <v-toolbar flat>
                <v-toolbar-title>{{ $tc('role.create') }}</v-toolbar-title>
                <v-spacer/>
            </v-toolbar>
        </v-card>
        <v-card>
            <v-card-text>
                <v-form
                    id="add-agency-form"
                    autocomplete="off"
                    @submit.prevent=""
                >
                    <v-text-field
                        v-model="item.name"
                        :label="$tc('role.name') + '*'"
                        required
                        :counter="200"
                        :maxlength="200"
                        :minlength="3"
                        :error-messages="nameErrors"
                        @keypress="isCustomKey($event, regex)"
                    />
                    <v-text-field
                        v-model="item.description"
                        :label="$tc('role.description') + '*'"
                        required
                        :counter="200"
                        :maxlength="200"
                        :minlength="3"
                        :error-messages="nameErrors"
                        @keypress="isCustomKey($event, regex)"
                    />
                    <v-select
                        v-model="item.permissions"
                        :items="permissions"
                        item-text="description"
                        :label="$tc('role.permissions') + '*'"
                        multiple
                        chips
                        item-value="id"
                    />
                    <v-spacer/>
                    <v-btn
                        color="success"
                        form="add-agency-form"
                        type="submit"
                        @click="saveItem"
                    >
                        {{ $tc('common.save') }}
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

import RoleService from "../../../../services/api/RoleService";
import PermissionService from "../../../../services/api/PermissionService";
import {mapGetters} from "vuex";
import ForceInputMixin from "../../../mixins/ForceInputMixin";
import RoleValidation from "./RoleValidation";

export default {
    name: "RoleIndex",
    components: {
    },
    mixins: [
        ForceInputMixin,
        RoleValidation,
    ],
    data() {
        return {
            item: {
                name: null,
                description: null,
                permissions: []
            },
            permissions: [],
            regex: /^[a-z A-Z0-9ğüşıöçĞÜŞİÖÇ.\-/,()]*$/,
        }
    },
    computed: {
        ...mapGetters({
            updateData: 'filterableTable/updateData',
            editItem: 'role/editItem',
            isEditing: 'role/editing',
        }),
    },
    created() {
        if (this.isEditing) {
            this.item = this.editItem;
        }
        this.fetchPermissions();
    },
    methods: {
        async fetchPermissions() {
            await (new PermissionService)
                .all()
                .then(res => {
                    this.permissions = res.data.data;
                })
                .catch(e => {
                    console.log(e)
                });
        },
        async saveItem() {
            await this.$v.item.$reset();
            await this.$v.item.$touch();
            await this.waitForValidation();
            if (!this.$v.item.$error) {
                (new RoleService).store(this.item)
                    .then(res => {
                        this.$store.dispatch('role/setEditing', false);
                        this.$store.dispatch('role/setEditItem', null);
                        this.$store.dispatch('filterableTable/setUpdateData', !this.updateData)
                        this.$emit('update:dialog', false);
                        this.$router.push({name: 'admin.roles.index'});
                    })
                    .catch(e => {
                        console.log(e);
                    });
                await this.$v.item.$reset();
            }
        },
        async updateItem() {
            await this.$v.item.$reset();
            await this.$v.item.$touch();
            await this.waitForValidation();
            if (!this.$v.item.$error) {
                (new RoleService).update(this.item.id, this.item)
                    .then(res => {
                        this.$store.dispatch('role/setEditing', false);
                        this.$store.dispatch('role/setEditItem', null);
                        this.$store.dispatch('filterableTable/setUpdateData', !this.updateData)
                        this.$emit('update:dialog', false);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                await this.$v.item.$reset();
            }
        },
        waitForValidation() {
            return new Promise(resolve => {
                if (this.$v.item.$error || !this.$v.item.$pending) {
                    return resolve()
                }
                let poll = setInterval(() => {
                    if (!this.$v.item.$pending) {
                        clearInterval(poll)
                        resolve()
                    }
                }, 200)
            })
        },
    },
}
</script>

<style scoped>

</style>