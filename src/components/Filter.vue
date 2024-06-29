<template>
  <div class="filter" v-if="mainStore.filterVisible">
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
      <div class="show__main item">
        <a href="" class="show__main-button" @click.prevent="showSidebar('genres')">
          <span>Genres</span>
          <span class="mini-span">{{ displayedGenres }}</span>
        </a>
        <a href="" class="show__main-button" @click.prevent="showSidebar('countries')">
          <span>Country</span>
          <span class="mini-span">{{ displayedCountries }}</span>
        </a>
        <a href="" class="show__main-button" @click.prevent="showSidebar('years')">
          <span>Year</span>
          <span class="mini-span">all</span>
        </a>
      </div>
    </div>
    <my-fixed-buttom>
      <my-button :clickMethod="showMovies">Show</my-button>
    </my-fixed-buttom>
  </div>
  <Sidebar v-if="filterStore.attribute === 'genres'"
    v-model:show="mainStore.sidebarVisible"
    v-model:list="globalStore.genres"
  />
  <Sidebar v-else-if="filterStore.attribute === 'countries'"
    v-model:show="mainStore.sidebarVisible"
    v-model:list="globalStore.countries"
  />
  <YearsSidebar v-else
    v-model:show="mainStore.sidebarVisible"
  />
</template>

<script setup>
import Sidebar from "@/components/Sidebar";
import YearsSidebar from "@/components/YearsSidebar";
import { useGlobalStore } from "@/stores/global";
import { useFilterStore } from "@/stores/filter";
import { useMainStore } from "@/stores/mainStore";
import { computed, ref, watch } from "vue";

const globalStore = useGlobalStore()
const filterStore = useFilterStore()
const mainStore = useMainStore()

const switchName = 'filter'
const switchItems = ['All', 'Films', 'TV Series']
let currentSwitchItem = ref('All')

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

watch(currentSwitchItem, () => {
  filterStore.movieType = currentSwitchItem
})

function showMovies() {
  mainStore.filterVisible = false
  mainStore.getMovies()
  mainStore.moviesVisible = true
}

function showSidebar(attribute) {
  filterStore.attribute = attribute
  mainStore.sidebarVisible = true
}
</script>

<style>
.filter {
}
.show {
}
.show__main-button {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	padding: 0px 14px;
	min-height: 45px;
}
.show__main-button:not(:last-child) {
	border-bottom: 1px solid rgb(91 87 107 / 50%);
}
.show__main-button:first-child {
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
.show__main-button:last-child {
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
}
</style>