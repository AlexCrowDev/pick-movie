import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/global";
import { useFilterStore } from "@/stores/filter";

export const useMainStore = defineStore('main', {
  state: () => ({
    sidebarVisible: false,
    filterVisible: true,
    moviesVisible: false,
    page: 1,
    selectedFields: 'selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=type&selectFields=year&selectFields=rating&selectFields=votes&selectFields=movieLength&selectFields=seriesLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=countries&',
    notNullFields: 'notNullFields=name&notNullFields=alternativeName&notNullFields=year&notNullFields=rating.kp&notNullFields=votes.kp&notNullFields=poster.url&',
  }),
  getters: {

  },
  actions: {
    getMovies() {
      const globalStore = useGlobalStore()
      const filterStore = useFilterStore()
      const selectedParams = filterStore.createParams()
      ++this.page
      // this.getMovies(globalStore.apiUrl + 'movie?' + this.selectFields + this.notNullFields, selectedParams);
    },
  }
})