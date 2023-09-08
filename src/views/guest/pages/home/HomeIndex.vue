<script setup lang="ts">
import Welcome from '@/views/guest/pages/home/Welcome.vue';
// import LocaleChanger from '../../../components/LocaleChanger';
</script>
<template>
  <div>
    <!--        <v-app-bar-->
    <!--            app-->
    <!--            color="primary"-->
    <!--            dark-->
    <!--        >-->
    <!--            <div class="d-flex align-center">-->
    <!--                &lt;!&ndash;                <v-img&ndash;&gt;-->
    <!--                &lt;!&ndash;                    alt="Vuetify Logo"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    class="shrink mr-2"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    contain&ndash;&gt;-->
    <!--                &lt;!&ndash;                    src="../../../../assets/img/getir_logo_dark.png"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    transition="scale-transition"&ndash;&gt;-->
    <!--                &lt;!&ndash;                    width="40"&ndash;&gt;-->
    <!--                &lt;!&ndash;                />&ndash;&gt;-->
    <!--                <v-img-->
    <!--                    alt="Vuetify Name"-->
    <!--                    class="shrink mt-1 hidden-sm-and-down"-->
    <!--                    contain-->
    <!--                    min-width="100"-->
    <!--                    :src="require('@/assets/img/getir_word_dark.png')"-->
    <!--                    width="100"-->
    <!--                />-->
    <!--            </div>-->
    <!--            <v-spacer/>-->
    <!--            <locale-changer/>-->
    <!--            <v-btn-->
    <!--                class="mr-2"-->
    <!--                dark-->
    <!--            >-->
    <!--                <router-link to="login">-->
    <!--                    <span>{{ $tc('home.login') }}</span>-->
    <!--                </router-link>-->
    <!--            </v-btn>-->
    <!--            <v-btn-->
    <!--                class="mr-2"-->
    <!--                dark-->
    <!--            >-->
    <!--                <router-link to="register">-->
    <!--                    <span>{{ $tc('home.register') }}</span>-->
    <!--                </router-link>-->
    <!--            </v-btn>-->
    <!--        </v-app-bar>-->
    <welcome />
  </div>
</template>

<style scoped></style>
