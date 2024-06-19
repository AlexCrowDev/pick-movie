<template>
  <div class="filter" v-if="filterStore.filterVisible">
    <div class="show">
      <my-h2>Show</my-h2>
      <div class="switches item">
        <my-switch :name="filterStore.switchName" v-model="filterStore.movieType" id="All" checked>All</my-switch>
        <my-switch :name="filterStore.switchName" v-model="filterStore.movieType" id="Films">Films</my-switch>
        <my-switch :name="filterStore.switchName" v-model="filterStore.movieType" id="TV Series">TV Series</my-switch>
      </div>
      <div class="show__main item">
        <a href="" class="show__main-button" @click.prevent="filterStore.showSidebar('genres')">
          <span>Genres</span>
          <span class="mini-span">{{ displayedGenres }}</span>
        </a>
        <a href="" class="show__main-button" @click.prevent="filterStore.showSidebar('countries')">
          <span>Country</span>
          <span class="mini-span">{{ displayedCountries }}</span>
        </a>
        <a href="" class="show__main-button" @click.prevent="filterStore.showSidebar('years')">
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
    v-model:show="filterStore.sidebarVisible"
    v-model:list="globalStore.genres"
    :attribute="attribute"
  />
  <Sidebar v-else-if="filterStore.attribute === 'countries'"
    v-model:show="filterStore.sidebarVisible"
    v-model:list="globalStore.countries"
    :attribute="attribute"
  />
  <Sidebar v-else-if="filterStore.attribute === 'years'"
    v-model:show="filterStore.sidebarVisible"
    :attribute="attribute"
  />
  <Movies
    v-model:show="filterStore.moviesVisible"
    :clickMethod="showMovies"
  />
</template>

<script setup>
import Sidebar from "@/components/Sidebar";
import Movies from "@/components/Movies";
import { useGlobalStore } from "@/stores/global";
import { useFilterStore } from "@/stores/filter";
import { useSidebarStore } from "@/stores/sidebar";
import { computed } from "vue";

const globalStore = useGlobalStore()
const filterStore = useFilterStore()
const sidebarStore = useSidebarStore()

const includedGenres = computed(() => {
  return [...globalStore.genres].filter(item => item.included)
})
const excludedGenres = computed(() => {
  return [...globalStore.genres].filter(item => item.excluded)
})
const includedCountries = computed(() => {
  return [...globalStore.countries].filter(item => item.included)
})
const excludedCountries = computed(() => {
  return [...globalStore.countries].filter(item => item.excluded)
})

const displayedGenres = computed(() => {
  let includedGenresNames = includedGenres.value.map(item => item.name)
  let excludedGenresNames = excludedGenres.value.map(item => item.name)

  if (includedGenresNames.length > 0) {
    return includedGenresNames.slice(0, 3).join(', ')
  } else if (excludedGenresNames.length > 0) {
    return 'все, кроме: ' + excludedGenresNames.slice(0, 3).join(', ')
  } else {
    return 'all'
  }
})
const displayedCountries = computed(() => {
  let includedCountriesNames = includedCountries.value.map(item => item.name)
  let excludedCountriesNames = excludedCountries.value.map(item => item.name)

  if (includedCountriesNames.length > 0) {
    return includedCountriesNames.slice(0, 3).join(', ')
  } else if (excludedCountriesNames.length > 0) {
    return 'кроме: ' + excludedCountriesNames.slice(0, 3).join(', ')
  } else {
    return 'all'
  }
})


function createParams() {
  let params = new URLSearchParams()
  let animatedFilm
  
  includedGenres.value.forEach((genre) => {
    if (genre.name === 'мультфильм') {
      animatedFilm = genre.name
    }
    params.append('genres.name', `+${genre.name}`)
  })
  
  excludedGenres.value.forEach((genre) => {
    params.append('genres.name', `!${genre.name}`)
  })

  includedCountries.value.forEach((country) => {
    params.append('countries.name', `+${country.name}`)
  })

  excludedCountries.value.forEach((country) => {
    params.append('countries.name', `!${country.name}`)
  })

  // if (model.years.length > 1) {
  // params.append('year', model.years.join('-'));
  // }

  // if (model.rating.length > 1) {
  //   params.append('rating.kp', model.rating.join('-'));
  // }
  if ((filterStore.movieType === 'TV Series') && animatedFilm) {
    params.append('type', 'animated-series')
  } else if (filterStore.movieType === 'TV Series') {
    params.append('type', 'tv-series')
  } else if (filterStore.movieType === 'Films') {
    params.append('type', 'movie')
  }

  params.append('votes.kp', '10000-2500000')
  params.append('sortField', 'rating.kp')
  params.append('sortType', '-1')
  params.append('page', filterStore.page)
  params.append('limit', '100')
  console.log(params.toString())
  return params.toString()
}
 function showMovies() {
  ++filterStore.page
  console.log(filterStore.page);
  let selectedParams = createParams();
  
  filterStore.filterVisible = false

  // filterStore.getMovies(filterStore.apiUrl + 'movie?' + filterStore.selectFields + filterStore.notNullFields, selectedParams);
  filterStore.moviesVisible = true
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