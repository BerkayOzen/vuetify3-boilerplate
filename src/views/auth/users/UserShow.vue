<template>
    <v-container
        fill-height
        fluid
        grid-list-xl
    >
        <v-layout
            justify-center
            wrap
        >
            <v-flex
                xs12
                md8
                offset-md4
            >
                <v-card
                    color="general"
                    title="Edit Profile"
                    text="Complete your profile"
                >
                    <v-form>
                        <v-container py-0>
                            <v-layout wrap>
                                <v-flex
                                    xs12
                                    md6
                                >
                                    <v-text-field
                                        v-model="user.username"
                                        class="purple-input"
                                        :label="$tc('user.username')"
                                        :disabled="true"
                                    />
                                </v-flex>
                                <v-flex
                                    xs12
                                    md6
                                >
                                    <v-text-field
                                        v-model="user.email"
                                        :label="$tc('user.email')"
                                        class="purple-input"
                                        :disabled="true"
                                    />
                                </v-flex>
                                <v-flex
                                    v-if="user.info"
                                    xs12
                                    md6
                                >
                                    <v-text-field
                                        v-model="user.info.firstName"
                                        :label="$tc('user.firstName')"
                                        class="purple-input"
                                        :disabled="!isEdit"
                                    />
                                </v-flex>
                                <v-flex
                                    v-if="user.info"
                                    xs12
                                    md6
                                >
                                    <v-text-field
                                        v-model="user.info.lastName"
                                        :label="$tc('user.lastName')"
                                        class="purple-input"
                                        :disabled="!isEdit"
                                    />
                                </v-flex>
                                <v-flex
                                    v-if="user.info"
                                    xs12
                                    md6
                                >
                                    <v-text-field
                                        v-if="!isEdit"
                                        v-model="date"
                                        :label="$tc('user.birthday')"
                                        class="purple-input"
                                        :disabled="!isEdit"
                                    />
                                    <date-time
                                        v-if="isEdit"
                                        :label="'Birthday'"
                                        :date.sync="user.info.birthday"
                                        :format="true"
                                    />
                                </v-flex>
                                <v-flex
                                    v-if="user.info"
                                    xs12
                                    md6
                                >
                                    <v-select
                                        v-model="user.info.gender"
                                        :items="genders"
                                        class="purple-input"
                                        :label="$tc('user.gender')"
                                        :disabled="!isEdit"
                                    />
                                </v-flex>
                                <v-flex
                                    v-if="!isEdit"
                                    xs12
                                    text-xs-right
                                >
                                    <v-btn
                                        class="mx-0 font-weight-light"
                                        color="general"
                                        @click="updateUser"
                                    >
                                        {{ $tc('user.editUser') }}
                                    </v-btn>
                                </v-flex>
                                <v-flex
                                    v-if="isEdit"
                                    xs6
                                    text-xs-right
                                >
                                    <v-btn
                                        class="mx-0 font-weight-light"
                                        color="success"
                                        @click="save"
                                    >
                                        {{ $tc('user.save') }}
                                    </v-btn>
                                </v-flex>
                                <v-flex
                                    v-if="isEdit"
                                    xs6
                                    text-xs-right
                                >
                                    <v-btn
                                        class="mx-0 font-weight-light"
                                        color="error"
                                        @click="cancelUpdate"
                                    >
                                        {{ $tc('user.cancel') }}
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card>
                <v-card
                    v-if="isEdit"
                >
                    <v-select
                        v-model="user.info.role"
                        :items="roles"
                        item-text="description"
                        :label="$tc('role.title') + '*'"
                        chips
                        item-value="id"
                    />
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import UserService from "@/services/api/UserService";
import RoleService from "../../../../services/api/RoleService";
import DateTime from "@/views/components/DateTime";
import {mapGetters} from "vuex";

export default {
    name: "UserShow",
    components: {
        DateTime,
    },
    data() {
        return {
            user: {},
            genders: [
                {text: 'Null', value: 0},
                {text: 'Male', value: 1},
                {text: 'Female', value: 2},
            ],
            roles: [],
            isEdit: false,
        }
    },
    computed: {
        ...mapGetters('user', {
            editing: 'editing',
        }),
        date() {
            return this.formatDate(this.user.info.birthday)
        }
    },
    watch: {
        isEdit() {
            if (this.isEdit){
                this.fetchRoles()
            }
        },
    },
    beforeDestroy() {
        this.isEdit = false;
        this.$store.dispatch('user/setEditing', false);
    },
    created() {
        let userId = this.$route.params.userId;
        this.fetchUser(userId);
        if (this.editing) {
            this.isEdit = true;
            this.fetchRoles();
        }
    },
    methods: {
        fetchUser($id) {
            (new UserService).show($id)
                .then(response => {
                    this.user = response.data.data
                })
                .catch(e => {
                    console.log(e)
                });
        },
        fetchRoles() {
            (new RoleService).all()
                .then(response => {
                    this.roles = response.data.data
                    this.user.info.role = this.user.roles[0] ? this.user.roles[0] : null;
                })
                .catch(e => {
                    console.log(e)
                });
        },
        updateUser() {
            this.isEdit = true;
        },
        save() {
            (new UserService).update(this.user.id, this.user.info)
                .then(response => {
                    this.user = response.data.data
                    this.fetchUser(this.user.id);
                    this.isEdit = false;
                })
                .catch(e => {
                    console.log(e)
                });
        },
        cancelUpdate() {
            this.isEdit = false;
            this.$store.dispatch('user/setEditing', false);
            this.fetchUser(this.user.id)
        },
        formatDate(date) {
            if (!date) return null;
            let [year, month, day] = [];
            if (date.includes("."))
                [day, month, year] = date.split('.');
            else
                [year, month, day] = date.split('-');
            return `${day}.${month}.${year}`
        },
    },
}
</script>

<style scoped>

</style>