<template>
  <div class="movies" v-if="show">
		<Movie
			:movies="moviesStore.moviesStub"
		/>
    <my-fixed-buttom>
      <my-button :clickMethod="clickMethod">Next</my-button>
    </my-fixed-buttom>
  </div>
</template>

<script setup>
import Movie from "@/components/Movie";
import { useMoviesStore } from "@/stores/movies";

const	props = defineProps({
	clickMethod: {
		type: Function,
	},
	show: {
		type: Boolean,
		default: false,
	},
})
const moviesStore = useMoviesStore()
</script>

<style>
.movies {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>