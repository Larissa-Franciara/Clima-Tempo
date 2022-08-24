<template>
<div>
<Suspense>
  <template #default>
    <AsyncView />
  </template>
  <template #fallback>
    <CityViewSeletion />
  </template>
</Suspense>

</div>
</template>

<script setup>

import AsyncView from "../components/AsyncView.vue";
import CityViewSeletion from "../components/CityViewSeletion.vue";
</script>


