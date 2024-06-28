import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/global";

export const useFilterStore = defineStore('filter', {
  state: () => ({
    switchName: 'filter',
    sidebarVisible: false,
    filterVisible: true,
    moviesVisible: false,
    attribute: '',
    movieType: 'All',
    page: 0,
    list: [],
    years: [],
    rating: [],
    selectedFields: 'selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=type&selectFields=year&selectFields=rating&selectFields=votes&selectFields=movieLength&selectFields=seriesLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=countries&',
    notNullFields: 'notNullFields=name&notNullFields=alternativeName&notNullFields=year&notNullFields=rating.kp&notNullFields=votes.kp&notNullFields=poster.url&',
  }),
  getters: {
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
    showSidebar(attribute) {
      this.attribute = attribute
      this.sidebarVisible = true
    },
    showMovies(selectedParams) {
      const globalStore = useGlobalStore()
      
      ++this.page
      this.filterVisible = false
      // this.getMovies(globalStore.apiUrl + 'movie?' + this.selectFields + this.notNullFields, selectedParams);
      this.moviesVisible = true
    },
  }
})