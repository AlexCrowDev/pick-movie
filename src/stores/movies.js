import { defineStore } from "pinia";

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
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
    moviesVisible: false,
  }),
  actions: {
    async getMovies(url, params) {
      let resp = await fetch(url + params, {
        headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
        }
      })
      let data = await resp.json()
      this.movies.push(...data.docs)
      setMoviesVisible()
    },
    setMoviesVisible() {
      this.moviesVisible = !this.moviesVisible
    }
  }
})