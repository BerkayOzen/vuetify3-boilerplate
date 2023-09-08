<template>
    <v-dialog
            v-model="dialog"
            style="overflow-y: visible;"
            max-width="600px"
            persistent
            @keydown.esc="closeModal"
            @keydown.enter="saveItem"
    >
        <v-card>
            <v-card
                    dark
                    color="primary"
                    class="font-weight-bold"
            >
                <v-card-title
                        class="title headline grey lighten-2"
                        primary-title
                >
                    {{ $tc('role.create') }}
                    <v-spacer/>
                    <v-btn
                            icon
                            @click="closeModal"
                    >
                        <v-icon
                                medium
                        >
                            fas fa-times
                        </v-icon>
                    </v-btn>
                </v-card-title>
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
                    </v-form>
                </v-card-text>
            </v-card>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                        color="error"
                        type="submit"
                        @click="closeModal"
                >
                    {{ $tc('common.cancel') }}
                </v-btn>
                <v-btn
                        v-if="!isEditing"
                        color="primary"
                        form="add-agency-form"
                        type="submit"
                        @click="saveItem"
                >
                    {{ $tc('common.save') }}
                </v-btn>
                <v-btn
                        v-else
                        color="primary"
                        form="add-agency-form"
                        type="submit"
                        @click="updateItem"
                >
                    {{ $tc('common.update') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";
import ForceInputMixin from "../../../mixins/ForceInputMixin";
import RoleService from "../../../../services/api/RoleService";
import RoleValidation from "./RoleValidation";

export default {
    name: "CreateAndEditAgentModal",
    mixins: [
        ForceInputMixin,
        RoleValidation,
    ],
    props: {
        dialog: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data() {
        return {
            item: {
                name: null,
            },
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
    },
    methods: {
        closeModal() {
            this.$store.dispatch('role/setEditing', false);
            this.$store.dispatch('role/setEditItem', null);
            this.$emit('update:dialog', false);
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