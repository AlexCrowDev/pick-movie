import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/global";

export const useFilterStore = defineStore('filter', {
  state: () => ({
    sidebarVisible: false,
    filterVisible: true,
    moviesVisible: false,
    movieType: 'All',
    years: [],
    rating: [],
  }),
  getters: {
    includedGenres() {
      const globalStore = useGlobalStore()
      return [...globalStore.genres].filter(item => item.included)
    },
    excludedGenres() {
      const globalStore = useGlobalStore()
      return [...globalStore.genres].filter(item => item.excluded)
    },
    includedCountries() {
      const globalStore = useGlobalStore()
      return [...globalStore.countries].filter(item => item.included)
    },
    excludedCountries() {
      const globalStore = useGlobalStore()
      return [...globalStore.countries].filter(item => item.excluded)
    },

  //   genres() {
  //     const globalStore = useGlobalStore()
      
  //     return [...globalStore.genres].map((item) => {
  //       return {
  //         ...item,
  //         included: false,
  //         excluded: false,
  //       }
  //     })
  //   },
  //   countries() {
  //     const globalStore = useGlobalStore()

  //     return [...globalStore.countries].map((item) => {
  //       return {
  //         ...item,
  //         included: false,
  //         excluded: false,
  //       }
  //     })
  //   },
  },
  actions: {
    createParams(page) {
      let params = new URLSearchParams()
      let animatedFilm
      
      this.includedGenres.forEach((genre) => {
        if (genre.name === 'мультфильм') {
          animatedFilm = genre.name
        }
        params.append('genres.name', `+${genre.name}`)
      })
      
      this.excludedGenres.forEach((genre) => {
        params.append('genres.name', `!${genre.name}`)
      })
    
      this.includedCountries.forEach((country) => {
        params.append('countries.name', `+${country.name}`)
      })
    
      this.excludedCountries.forEach((country) => {
        params.append('countries.name', `!${country.name}`)
      })
    
      // if (model.years.length > 1) {
      // params.append('year', model.years.join('-'));
      // }
    
      // if (model.rating.length > 1) {
      //   params.append('rating.kp', model.rating.join('-'));
      // }
      if ((this.movieType === 'TV Series') && animatedFilm) {
        params.append('type', 'animated-series')
      } else if (this.movieType === 'TV Series') {
        params.append('type', 'tv-series')
      } else if (this.movieType === 'Films') {
        params.append('type', 'movie')
      }
    
      params.append('votes.kp', '10000-2500000')
      params.append('sortField', 'rating.kp')
      params.append('sortType', '-1')
      params.append('page', page)
      params.append('limit', '100')
      console.log(params.toString())
      return params.toString()
    }
  }
})