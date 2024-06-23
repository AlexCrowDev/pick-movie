import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/global";

export const useMainStore = defineStore('main', {
  state: () => ({
    sidebarVisible: false,
    filterVisible: true,
    moviesVisible: false,
    attribute: '',
    page: 0,
  }),
  getters: {

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