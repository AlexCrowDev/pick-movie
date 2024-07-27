<template>
  <div class="sidebar" v-if="show">
    <Search
      v-model="searchQuery"
    />
    <div class="sidebar__switches switches item">
      <my-switch v-for="item in switchItems"
        :key="item"
        :name="switchName"
        :id="item"
        :checked="item === currentSwitchItem"
        @change="currentSwitchItem = item"
      >
        {{ item }}
      </my-switch>
    </div>
    <List v-if="currentSwitchItem === 'Include'"
      v-model:list="includedList"
      :currentSwitchItem="currentSwitchItem"
    />
    <List v-else
      v-model:list="excludedList"
      :currentSwitchItem="currentSwitchItem"
    />
    <fixed-button @click.prevent="hideSidebar">Show</fixed-button>
  </div>
</template>

<script>
  import Search from "@/components/Search";
  import List from "@/components/List";

  export default {
    components: {
    List, Search,
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
        this.$emit('update:list', this.searchedList)
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
	height: 100%;
	background-color: #16141c;
}
.search {
  margin: 15px 0px;
}
.sidebar__switches {
  margin: 15px 0px;
}
</style>