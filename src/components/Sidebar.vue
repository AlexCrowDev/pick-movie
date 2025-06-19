<template>
  <div class="sidebar" v-if="show">
    <Search
      v-model="searchQuery"
    />
    <RadioGroup
      :switchName
      :switchItems
      :currentSwitchItem
      @change-current="(item) => currentSwitchItem = item"
    />
    <List v-if="currentSwitchItem === 'Include'"
      v-model:list="includedList"
      :currentSwitchItem
    />
    <List v-else
      v-model:list="excludedList"
      :currentSwitchItem
    />
    <div class="sidebar__button-wrapper">
      <fixed-button @click.prevent="hideSidebar">Show</fixed-button>
    </div>
  </div>
</template>

<script>
  import Search from "@/components/Search";
  import List from "@/components/List";
  import RadioGroup from "@/components/RadioGroup";

  export default {
    components: {
    List, Search, RadioGroup, 
    },
    props: {
      list: {
        type: Array,
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        switchName: 'sidebar',
        searchQuery: '',
        currentSwitchItem: 'Include',
        switchItems: ['Include', 'Exclude']
      }
    },
    methods: {
      hideSidebar() {
        this.currentSwitchItem = 'Include'
        this.$emit('update:show', false)
      },
      // updateList(list) {
      //   list = this.list
      //   this.exclude = !this.exclude
      // },
      // updateLists() {
      //   if (this.currentSwitchItem === 'Choose') {
      //     this.includeList = this.excludeList.filter( item => item.checked !== true );
      //   } else if (this.currentSwitchItem === 'Exclude') {
      //     this.excludeList = this.includeList.filter( item => item.checked !== true );
      //   }
      // },
    },
    computed: {
      // currentList() {
      //   return [...this.list].filter((item) => {
      //     return {
      //       ...item,
      //       include: false,
      //       exclude: false,
      //     }
      //   })
      // },
      searchedList() {
        return [...this.list].filter( item => (
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
    // },
    // watch: {
    //   currentSwitchItem: {
    //     handler() {
    //       this.updateLists();
    //     },
    //     immediate: true
    //   },
    },
  }
</script>

<style>
.sidebar {
	z-index: 10;
  position: absolute;
  top: 0;
  right: 15px;
  left: 15px;
  min-height: 100vh;
  padding-top: 15px;
  padding-bottom: 55px;
	background-color: #16141c;
}
.search {
  margin: 15px 0px;
}
.sidebar__button-wrapper {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 11;
	background-color: #16141c;
}
</style>