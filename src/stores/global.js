import useApiClient from "@/composables/useApiClient";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
  state: () => ({
    genres: [],
    countries: [],
  }),
  getters: {
    
  },
  actions: {
    async loadGenres() {
      const ApiClient = useApiClient()

      this.genres = await ApiClient.getGenres()
    },
    async loadCountries() {
      const ApiClient = useApiClient()

      this.countries = await ApiClient.getCountries()
    },
    loadGenresStub() {
      this.genres = [{name: "аниме"}, {name: "драма"}, {name: "комедия"}, {name: "мультфильм"},]
    },
    loadCountriesStub() {
      this.countries =  [{name: "Россия"}, {name: "Беларусь"}, {name: "США"}]
    },
  }
})