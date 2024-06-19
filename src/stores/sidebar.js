import { defineStore } from "pinia";

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    switchName: 'sidebar',
    searchQuery: '',
    pickedSwitch: 'Choose',
  }),
  getters: {
    currentList() {
      return [...this.list].filter((item) => {
        return {
          ...item,
          included: false,
          excluded: false,
        }
      })
    },
    searchedList() {
      return this.currentList.filter( item => ( 
        item.name
                    .toLowerCase()
                    .includes( this.searchQuery.toLowerCase() ) 
      ) )
    },
    includedList() {
      return this.searchedList.filter(item => !item.excluded)
    },
    excludedList() {
      return this.searchedList.filter(item => !item.included)
    },
  },
  actions: {

  }
})