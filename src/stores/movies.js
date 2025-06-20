import useApiClient from "@/composables/useApiClient";
import { defineStore } from "pinia";
import { useFilterStore } from "./filter";

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: null,
    moviesStub: [
      {
        id:1,
        poster: {previewUrl: '/img/mem.676f777e.webp'},
        name:'lol',
        rating: {kp: 8},
        genres: [{name: 'mem'},{name: 'rofl'},{name: 'mem'},{name: 'rofl'}]
      },
      {
        id:2,
        poster: {previewUrl: '/img/mem.676f777e.webp'},
        name:'kek',
        rating: {kp: 9},
        genres: [{name: 'mem'}]
      },
      {
        id:3,
        poster: {previewUrl: '/img/mem.676f777e.webp'},
        name:'lol',
        rating: {kp: 8},
        genres: [{name: 'mem'}]
      },
      {
        id:4,
        poster: {previewUrl: '/img/mem.676f777e.webp'},
        name:'kek',
        rating: {kp: 9},
        genres: [{name: 'mem'}]
      },
      {
        id:5,
        poster: {previewUrl: '/img/mem.676f777e.webp'},
        name:'kek',
        rating: {kp: 9},
        genres: [{name: 'mem'}]
      },
      {
        id:6,
        poster: {previewUrl: '/img/mem.676f777e.webp'},
        name:'kek',
        rating: {kp: 9},
        genres: [{name: 'mem'}]
      },
      {
        id:7,
        poster: {previewUrl: '/img/mem.676f777e.webp'},
        name:'kek',
        rating: {kp: 9},
        genres: [{name: 'mem'}]
      },
    ],
    page: 1,
  }),
  actions: {
    async loadMovies(page) {
      const ApiClient = useApiClient()
      let data = await ApiClient.getMovies(page)
      this.movies = data.docs
    },
    nextMovies() {
      this.loadMovies(++this.page)
    },
  }
})