<template>
  <div class="movie" v-for="movie in movies">
    <a :href="href + movie.id" target="_blank">
      <img 
        class="movie__poster" 
        :src="movie.poster.previewUrl"
        alt="">
        <!-- <img 
        class="movie__poster" 
        src="@/assets/mem.webp"
        alt=""> -->
      <div class="movie__info">
        <div class="movie__rating">{{ (movie.rating.kp).toFixed(1) }}</div>
        <div class="movie__name">{{ movie.name }}</div>
        <div class="movie__genre mini-span">{{ movie.genres.map(genre => `${genre.name}`).slice(0, 2).join(', ') }}</div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      movies: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        href: 'https://www.kinopoisk.ru/film/'
      }
    }
  }
</script>

<style scoped>
.movie {
	position: relative;
	flex-direction: column;
	margin: 0px 10px 10px 0px;
	max-width: 160px;
}
.movie__poster {
	width: 158px;
	height: 237px;
	border-radius: 10px;
}
.movie__info {
	padding: 8px;
}
.movie__rating {
	position: absolute;
	display: flex;
	top: 7px;
	left: 7px;
	width: 40px;
	height: 20px;
	padding-top: 2px;
	text-align: center;
	align-items: center;
	justify-content: center;
	background-color: rgb(122, 91, 247);
	border-radius: 10px;
}
.movie__name {
  margin-bottom: 8px;
}
.movie__genre {
}
</style>