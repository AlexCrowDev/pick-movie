<template>
  <HeaderBlock/>
  <Filter
    :apiUrl="apiUrl"
    :apiKey="apiKey"
    :genres="genres"
    :countries="countries"
  />
</template>

<script>
  import HeaderBlock from "@/components/HeaderBlock";
  import Filter from "@/components/Filter";

  export default {
    components: {
      HeaderBlock, Filter,
    },
    data() {
      return {
        apiUrl: 'https://api.kinopoisk.dev/v1.4/',
        genresUrl: 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name',
        countriesUrl: 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name',
        apiKey: 'RJKDTJT-1HDM3FX-NGWJ4T8-KHQMWQF',
        genres: [],
        countries: [],
      }
    },
    methods: {
      async fetchCountries(url) {
        const resp = await fetch (url, {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': this.apiKey,
          }
        });
        this.countries = await resp.json()
      },

      getCountriesStub() {
        this.countries =  [{name: "Россия"}, {name: "Беларусь"}, {name: "США"}]
      },

      async fetchGenres(url) {
        const resp = await fetch (url, {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': this.apiKey,
          }
        })
        this.genres = await resp.json()
      },

      getGenresStub() {
        this.genres = [{name: "аниме"}, {name: "драма"}, {name: "комедия"}, {name: "мультфильм"},]
      },
    },
    mounted() {
      this.getGenresStub()
      this.getCountriesStub()
    }
  }
</script>

<style>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
html, body {
}
#app {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  overflow: auto;
  padding: 0px 15px;
  margin: 0px auto;
  box-sizing: content-box;
  line-height: 1;
  background: #16141c;
  font-size: 14px;
  color: #fff;
  font-family: 'Comfortaa', sans-serif;
  letter-spacing: 0.3px;
}
.item {
  background-color: rgb(91 87 107 / 20%);
  margin: 0 0 15px;
  border-radius: 10px;
}
.mini-span {
	color: #a7a4b5;
	font-size: 14px;
}
.switches {
	display: flex;
}
.active {
	background-color: rgb(122, 91, 247);
}
</style>