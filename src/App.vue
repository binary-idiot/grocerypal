<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useRegisterSW } from 'virtual:pwa-register/vue';

useRegisterSW();
</script>

<style module lang="scss">
@import "@/assets/base.scss";

</style>
