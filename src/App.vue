<template>
  <v-app id="app">
    <v-app-bar id="header" color="primary" fixed class="text-white">
      <router-link
        class="text-h5 font-weight-black text-white add-cursor no-underline ml-5 logo_font"
        to="/"
        >VOW.KR</router-link
      >
      <v-container class="fill-height justify-center">
        <v-spacer />
        <!-- <v-btn icon density="comfortable" color="dark" class="mx-2">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn> -->
      </v-container>
    </v-app-bar>
    <router-view />
    <v-footer
      id="footer"
      class="text-center d-flex flex-column justify-center"
      color="primary"
    >
      <div class="text-overline text-dark">
        <p>
          {{ new Date().getFullYear() }} — &copy;copyright
          <span class="text-white font-weight-black">Vow.kr</span>
        </p>
        <p class="my-3 text-caption text-dark">
          이 사이트는 한국 유저를 위해 제작하였습니다.
        </p>
      </div>
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-5"
          color="dark"
          variant="text"
          size="small"
        ></v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
const icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
</script>
<style lang="sass">
@import "@/assets/css/common.sass"
@import "@/assets/css/reset.scss"
.no-underline
  text-decoration: none
.underline
  padding: 2px 0
  border-bottom: 2px solid #EEEEEE
.logo_font
  font-weight: 900
</style>
