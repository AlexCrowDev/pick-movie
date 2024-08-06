<template>
  <div class="sidebar" v-if="show">
    <RadioGroup
      :switchName
      :switchItems
      :currentSwitchItem
      @change-current="(item) => currentSwitchItem = item"
    />
    <fixed-button @click.prevent="hideSidebar">Show</fixed-button>
  </div>
</template>

<script>
  import Search from "@/components/Search";
  import RadioGroup from "@/components/RadioGroup";

  export default {
    components: {
      Search, RadioGroup,
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        switchName: 'sidebar',
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
    },
  }
</script>

<style>

</style>