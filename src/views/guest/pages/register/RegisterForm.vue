<template>
    <v-main>
        <v-container
            fill-height
            fluid
        >
            <v-layout
                align-center
                justify-center
            >
                <v-flex
                    xs12
                    sm8
                    md4
                >
                    <v-card
                        class="elevation-12"
                    >
                        <v-toolbar
                            color="general"
                        >
                            <v-toolbar-title>Admin Panel</v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    ref="firstname"
                                    v-model="firstname"
                                    :rules="[() => !!firstname || 'This field is required']"
                                    prepend-icon="mdi-account"
                                    label="First Name"
                                    placeholder="TotallyNotThanos"
                                    required
                                />
                                <v-text-field
                                    ref="lastname"
                                    v-model="lastname"
                                    :rules="[() => !!lastname || 'This field is required']"
                                    prepend-icon="mdi-account"
                                    label="Last Name"
                                    placeholder="TotallyNotThanos"
                                    required
                                />
                                <v-text-field
                                    ref="username"
                                    v-model="username"
                                    :rules="[() => !!username || 'This field is required']"
                                    prepend-icon="mdi-account"
                                    label="Username"
                                    placeholder="TotallyNotThanos"
                                    required
                                />
                                <v-text-field
                                    ref="password"
                                    v-model="password"
                                    :rules="[() => !!password || 'This field is required']"
                                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    :type="showPassword ? 'text' : 'password'"
                                    prepend-icon="mdi-lock"
                                    label="Password"
                                    placeholder="*********"
                                    counter
                                    required
                                    @keydown.enter="register"
                                    @click:append="showPassword = !showPassword"
                                />
                                <v-text-field
                                    ref="password"
                                    v-model="password_confirmation"
                                    :rules="[() => !!password || 'This field is required']"
                                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    :type="showPassword ? 'text' : 'password'"
                                    prepend-icon="mdi-lock"
                                    label="Confirm Password"
                                    placeholder="*********"
                                    counter
                                    required
                                    @keydown.enter="register"
                                    @click:append="showPassword = !showPassword"
                                />
                            </v-form>
                        </v-card-text>
                        <v-divider class="mt-5"/>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                align-center
                                justify-center
                                color="general"
                                @click="register"
                            >
                                Register
                            </v-btn>
                        </v-card-actions>
                        <v-snackbar
                            v-model="snackbar"
                            :color="color"
                            :top="true"
                        >
                            {{ errorMessages }}
                            <v-btn
                                dark
                                text
                                @click="snackbar = false"
                            >
                                Close
                            </v-btn>
                        </v-snackbar>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
</template>

<script>
import AuthService from "../../../../services/api/AuthService";

export default {
    name: "RegisterForm",
    data() {
        return {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            errorMessages: 'Incorrect login info',
            snackbar: false,
            color: 'general',
            showPassword: false
        }
    },

    // Sends action to Vuex that will log you in and redirect to the dash otherwise, error
    methods: {
        register() {
            let payload = {
                firstname: this.firstname,
                lastname: this.lastname,
                username: this.username,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            };

            (new AuthService()).register(payload)
                .then(res => {
                    this.login()
                })
                .catch(e => {
                    console.log(e)
                });

            // this.$store.dispatch('login', payload)
            //     .then(() => this.$router.push('/dashboard'))
            //     .catch(err => {
            //             console.log(err)
            //             this.snackbar = true
            //         }
            //     )
        },
        login() {
            const credentials = {
                email: this.email,
                password: this.password,
            };

            this.$auth.login({
                data: credentials,
                remember: this.username,
                redirect: {name: 'admin.dashboard'},
                fetchUser: false,
                staySignedIn: true,
            }).then(response => {
                this.$auth.fetch();
            }).catch(e => {
                console.log(e)
            });
        }
    },
    metaInfo() {
        return {
            title: 'Super Secret | Login'
        }
    }
}
</script>

<style scoped>

</style>