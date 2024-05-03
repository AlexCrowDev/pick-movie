<template>
  <div class="movies" v-if="show">
		<MoviesList
			:movies="movies"
		/>
    <my-fixed-buttom>
      <my-button :clickMethod="clickMethod">Next</my-button>
    </my-fixed-buttom>
  </div>
</template>

<script>
	import MoviesList from "@/components/MoviesList";

  export default {
		components: {
			MoviesList,
		},
		props: {
			movies: {
        type: Array,
				required: true,
      },
			clickMethod: {
				type: Function,
			},
			show: {
        type: Boolean,
        default: false,
      },
		},
		methods: {

		},
  }
</script>

<style>
.movies {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>