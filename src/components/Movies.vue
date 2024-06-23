<template>
  <div class="movies" v-if="show">
		<Movie
			:movies="moviesStore.moviesStub"
		/>
    <my-fixed-buttom>
      <my-button :clickMethod="showMovies">Next</my-button>
    </my-fixed-buttom>
  </div>
</template>

<script setup>
import Movie from "@/components/Movie";
import { useFilterStore } from "@/stores/filter";
import { useMoviesStore } from "@/stores/movies";

const	props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
})
const moviesStore = useMoviesStore()
const filterStore = useFilterStore()

function showMovies() {
  filterStore.showMovies()
}
</script>

<style>
.movies {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>