<template>
  <div class="filter" v-if="filterStore.filterVisible">
    <div class="show">
      <my-h2>Show</my-h2>
      <RadioGroup
        :switchName
        :switchItems
        :currentSwitchItem
        @change-current="(item) => currentSwitchItem = item"
      />
      <ButtonsList
        :buttons="filterButtons"
        @open-sidebar="showSidebar"
      />
      <Range
        v-model="filterStore.rating"
      >
      KP Rating
      </Range>
    </div>
    <fixed-button @click.prevent="showMovies">Show</fixed-button>
  </div>
  <YearsSidebar v-if="currentSidebar == 'Years'"
    v-model:show="filterStore.sidebarVisible"
    v-model:years="filterStore.years"
    @change="(years) => displayedYears = years"
  />
  <Sidebar v-else
    v-model:show="filterStore.sidebarVisible"
    v-model:list="globalStore[currentSidebar.toLowerCase()]"
  />
</template>

<script setup>
import Sidebar from "@/components/Sidebar";
import YearsSidebar from "@/components/YearsSidebar";
import ButtonsList from "@/components/ButtonsList.vue"
import RadioGroup from "./RadioGroup.vue";
import Range from "./Range.vue";
import { useGlobalStore } from "@/stores/global";
import { useFilterStore } from "@/stores/filter";
import { useMoviesStore } from "@/stores/movies";
import { computed, provide, ref, watch } from "vue";

const globalStore = useGlobalStore()
const filterStore = useFilterStore()
const moviesStore = useMoviesStore()

const switchName = 'filter'
const switchItems = ['All', 'Films', 'TV Series']
let currentSwitchItem = ref(switchItems[0])

watch(currentSwitchItem, () => {
  filterStore.movieType = currentSwitchItem.value
})


const displayedGenres = computed(() => {
  let includedGenresNames = filterStore.includedGenres.map(item => item.name)
  let excludedGenresNames = filterStore.excludedGenres.map(item => item.name)

  if (includedGenresNames.length > 0) {
    return includedGenresNames.slice(0, 3).join(', ')
  } else if (excludedGenresNames.length > 0) {
    return 'все, кроме: ' + excludedGenresNames.slice(0, 3).join(', ')
  } else {
    return 'all'
  }
})
const displayedCountries = computed(() => {
  let includedCountriesNames = filterStore.includedCountries.map(item => item.name)
  let excludedCountriesNames = filterStore.excludedCountries.map(item => item.name)

  if (includedCountriesNames.length > 0) {
    return includedCountriesNames.slice(0, 3).join(', ')
  } else if (excludedCountriesNames.length > 0) {
    return 'кроме: ' + excludedCountriesNames.slice(0, 3).join(', ')
  } else {
    return 'all'
  }
})
let displayedYears = ref('all')

const filterButtons = ref({
  Genres: displayedGenres,
  Countries: displayedCountries,
  Years: displayedYears,
})

let currentSidebar = ref('Genres')
provide('placeholder', currentSidebar)


function showMovies() {
  filterStore.filterVisible = false
  moviesStore.loadMovies(1)
  // filterStore.createParams(1)
  filterStore.moviesVisible = true
}

function showSidebar(button) {
  currentSidebar.value = button
  filterStore.sidebarVisible = true
}
</script>

<style>

</style>