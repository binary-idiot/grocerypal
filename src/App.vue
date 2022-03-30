<template>
  <RouterView />
  <ReloadPrompt />
</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import ReloadPrompt from './components/system/ReloadPrompt.vue';
</script>

<style lang="scss">
  @import "@/assets/base.scss";
</style>
