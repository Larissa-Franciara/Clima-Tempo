<template>
  <div
      class="flex flex-col min-h-screen font-Roboto bg"
  >
    <SiteNavigation />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import SiteNavigation from './components/SiteNavigation.vue'


</script>
<style>
.bg {
  height: 100vh;
  background-image: url("./assets/img/bg.jpg");
  background-position: 20% 65%;
  background-size: cover;

}
</style>
