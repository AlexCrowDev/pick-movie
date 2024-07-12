<template>
  <div class="movies" v-if="filterStore.moviesVisible">
		<Movie
			:movies="moviesStore.moviesStub"
		/>
    <my-fixed-buttom>
      <my-button :clickMethod="moviesStore.nextMovies">Next</my-button>
    </my-fixed-buttom>
  </div>
</template>

<script setup>
import Movie from "@/components/Movie";
import { useFilterStore } from "@/stores/filter";
import { useMoviesStore } from "@/stores/movies";

const moviesStore = useMoviesStore()
const filterStore = useFilterStore()

</script>

<style>
.movies {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>