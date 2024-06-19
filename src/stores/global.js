import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
  state: () => ({
    apiUrl: 'https://api.kinopoisk.dev/v1.4/',
    apiKey: 'RJKDTJT-1HDM3FX-NGWJ4T8-KHQMWQF',
    genresUrl: 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name',
    countriesUrl: 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name',
    genres: [],
    countries: [],
  }),
  getters: {
    
  },
  actions: {
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
  }
})