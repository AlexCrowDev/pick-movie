<template>
  <div v-if="filterStore.moviesVisible">
		<div class="movies">
			<MovieSkeleton v-if="skeletonActive"
			/>
			<template v-else-if="moviesStore.movies.length">
				<Movie
					:movies="moviesStore.movies"
				/>
				<fixed-button @click.prevent="nextMovies">Next</fixed-button>
			</template>
			<p v-else>Movies not found</p>
		</div>
  </div>
</template>

<script setup>
import Movie from "@/components/Movie";
import MovieSkeleton from "@/components/MovieSkeleton";
import { useFilterStore } from "@/stores/filter";
import { useMoviesStore } from "@/stores/movies";
import { ref, watch } from "vue";

const moviesStore = useMoviesStore()
const filterStore = useFilterStore()

let skeletonActive = ref(true)

watch(() => moviesStore.movies, () => {
  skeletonActive.value = false
})

function nextMovies() {
	skeletonActive.value = true
	moviesStore.nextMovies()
}

</script>

<style>
.movies {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>