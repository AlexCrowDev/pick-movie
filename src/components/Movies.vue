<template>
  <div class="movies" v-if="mainStore.moviesVisible">
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
import { useMainStore } from "@/stores/mainStore";
import { useMoviesStore } from "@/stores/movies";

const moviesStore = useMoviesStore()
const mainStore = useMainStore()

</script>

<style>
.movies {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>