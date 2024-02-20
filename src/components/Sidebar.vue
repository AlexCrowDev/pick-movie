<template>
  <div class="sidebar" v-if="show">
    <Search
      :placeholder="placeholder"
      v-model="searchQuery"
    />
    <div class="switches item">
      <my-switch :name="name" id="Choose">Choose</my-switch>
      <my-switch :name="name" id="Exclude">Exclude</my-switch>
    </div>
    <List
      :list="searchedList"
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
        reqvired: true,
      },
      show: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        reqvired: true,
      },
    },
    data() {
      return {
        name: 'sidebar',
        searchQuery: '',
      }
    },
    methods: {
      hideSidebar() {
        this.$emit('update:show', false)
      },
    },
    computed: {
      searchedList() {
        return [...this.list].filter( element => ( element.name.toLowerCase().includes( this.searchQuery.toLowerCase() ) ) )
      },
    }
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
</style>