<template>
  <div class="filter" v-if="filterStore.filterVisible">
    <div class="show">
      <my-h2>Show</my-h2>
      <div class="switches item">
        <my-switch v-for="item in switchItems"
          :key="item"
          :name="switchName"
          :id="item"
          :checked="item === currentSwitchItem"
          @change="currentSwitchItem = item"
        >
          {{ item }}
        </my-switch>
      </div>
      <ButtonsList
        :buttons="filterButtons"
        @open-sidebar="showSidebar"
      />
    </div>
    <my-fixed-buttom>
      <my-button :clickMethod="showMovies">Show</my-button>
    </my-fixed-buttom>
  </div>
    <component :is="sidebars[currentSidebar]"
      v-model:show="filterStore.sidebarVisible"
      v-model:list="globalStore[currentSidebar.toLowerCase()]"
    />
</template>

<script setup>
import Sidebar from "@/components/Sidebar";
import YearsSidebar from "@/components/YearsSidebar";
import ButtonsList from "@/components/ButtonsList.vue"
import { useGlobalStore } from "@/stores/global";
import { useFilterStore } from "@/stores/filter";
import { useMoviesStore } from "@/stores/movies";
import { computed, ref, watch } from "vue";

const globalStore = useGlobalStore()
const filterStore = useFilterStore()
const moviesStore = useMoviesStore()

const switchName = 'filter'
const switchItems = ['All', 'Films', 'TV Series']
let currentSwitchItem = ref('All')

watch(currentSwitchItem, () => {
  filterStore.movieType = currentSwitchItem
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

const filterButtons = ref({
  Genres: displayedGenres,
  Countries: displayedCountries,
  Years: 'all',
})
const sidebars = {
  Genres: Sidebar,
  Countries: Sidebar,
  Years: YearsSidebar,
}
let currentSidebar = ref('Genres')

function showMovies() {
  filterStore.filterVisible = false
  // moviesStore.loadMovies(1)
  filterStore.moviesVisible = true
}

function showSidebar(button) {
  currentSidebar = button
  filterStore.sidebarVisible = true
}
</script>

<style>

</style>