<template>
  <div class="sidebar" v-if="show">
    <Search v-if="attribute !== 'years'"
      :placeholder="attribute"
      v-model="searchQuery"
    />
    <div class="sidebar__switches">
      <div class="switches item">
        <my-switch :name="switchName" v-model="pickedSwitch" id="Choose" checked>Choose</my-switch>
        <my-switch :name="switchName" v-model="pickedSwitch" id="Exclude">Exclude</my-switch>
      </div>
    </div>
    <!-- <List v-if="attribute !== 'years'"
      v-model:list="searchedList"
      :pickedSwitch="pickedSwitch"
    /> -->
    <List v-if="attribute !== 'years' && pickedSwitch === 'Choose'"
      v-model:list="includedList"
      :pickedSwitch="pickedSwitch"
    />
    <List v-if="attribute !== 'years' && pickedSwitch === 'Exclude'"
      v-model:list="excludedList"
      :pickedSwitch="pickedSwitch"
    />
    <my-fixed-buttom>
      <my-button @click.prevent="hideSidebar">Show</my-button>
    </my-fixed-buttom>
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
        required: true,
      },
      show: {
        type: Boolean,
        default: false,
      },
      attribute: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        switchName: 'sidebar',
        searchQuery: '',
        pickedSwitch: 'Choose',
      }
    },
    methods: {
      hideSidebar() {
        this.pickedSwitch = 'Choose'
        this.$emit('update:list', this.currentList)
        this.$emit('update:show', false)
      },
      // updateList(list) {
      //   list = this.list
      //   this.exclude = !this.exclude
      // },
      // updateLists() {
      //   if (this.pickedSwitch === 'Choose') {
      //     this.includedList = this.excludedList.filter( item => item.checked !== true );
      //   } else if (this.pickedSwitch === 'Exclude') {
      //     this.excludedList = this.includedList.filter( item => item.checked !== true );
      //   }
      // },
    },
    computed: {
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
    // },
    // watch: {
    //   pickedSwitch: {
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