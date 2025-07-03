<template>
  <v-container fluid class="mx-0">
    <v-row class="justify-center">
      <v-col class="" cols="12">
        <v-img src="@/assets/logo.png" width="120" class="mx-auto"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify';
import { useGoTo } from 'vuetify'

const { xs, mdAndUp } = useDisplay();
const goTo = useGoTo()

const linkProgramacao = "/programacao-pium-mistico";

const isXs = xs.value;
const isMdAndUp = mdAndUp.value;
</script>
