<template>
  <div class="sidebar" v-if="show">
    <Search
      :placeholder="placeholder"
      @get="listFilter"
    />
    <div class="switches item">
      <my-switch :name="name" id="Choose">Choose</my-switch>
      <my-switch :name="name" id="Exclude">Exclude</my-switch>
    </div>
    <List
      :list="allList"
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
        list: [
          {name: 'USA'},
          {name: 'UK'},
          {name: 'France'},
          
        ],
        name: 'sidebar',
        allList: [
          {name: 'USA'},
          {name: 'UK'},
          {name: 'France'},
        ],
      }
    },
    methods: {
      listFilter(value) {
        this.allList = this.list.filter(element => {
          if (element.name.toLowerCase().includes(value.toLowerCase())) {
            return element
          } else if (!value) {
            this.allList = this.list
          }
        });
        // console.log(this.filterList)
      },
      hideSidebar() {
        this.$emit('update:show', false)
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