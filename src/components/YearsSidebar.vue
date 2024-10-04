<template>
  <div class="sidebar" v-if="show">
    <Range
      v-model="localYears"
      @change="(displayedInfo) => $emit('change', displayedInfo)"
    />
    <fixed-button @click.prevent="hideSidebar">Show</fixed-button>
  </div>
</template>

<script>
  import Search from "@/components/Search";
  import Range from "@/components/Range";

  export default {
    components: {
      Search, Range,
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      years: {
        type: Array,
      },
    },
    data() {
      return {
        localYears: this.years,
      }
    },
    methods: {
      hideSidebar() {
        this.$emit('update:years', this.localYears)
        this.$emit('update:show', false)
      },
    },
    computed: {
    }
  }
</script>

<style>
</style>