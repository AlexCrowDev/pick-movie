<template>
  <Filter
  />
  <Movies
    v-model:show="filterStore.moviesVisible"
  />
</template>

<script setup>
import Movies from "@/components/Movies";
import Filter from "@/components/Filter.vue";
import { useGlobalStore } from "@/stores/global";
import { useFilterStore } from "@/stores/filter";

const globalStore = useGlobalStore()
const filterStore = useFilterStore()

</script>

<style>

</style>