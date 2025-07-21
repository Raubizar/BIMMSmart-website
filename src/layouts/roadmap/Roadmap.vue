<template>
  <v-app class="py-0 my-0 px-0 mx-0">
    <router-view />
    <default-footer />
  </v-app>
</template>

<script setup>
import DefaultFooter from '../default/Footer.vue'
</script>