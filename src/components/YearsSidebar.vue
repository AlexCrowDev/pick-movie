<template>
  <div class="sidebar" v-if="show">
    <RadioGroup
      :switchName
      :switchItems
      :currentSwitchItem
      @change-current="(item) => currentSwitchItem = item"
    />
    <div class="years item">
      <span class="mini-span">{{ displayedYears }}</span>
      <Slider
        class="years__slider"
        v-model="localYears"
        range
        :min
        :max
      />
    </div>
    <fixed-button @click.prevent="hideSidebar">Show</fixed-button>
  </div>
</template>

<script>
  import Search from "@/components/Search";
  import RadioGroup from "@/components/RadioGroup";
  import Slider from 'primevue/slider';

  export default {
    components: {
      Search, RadioGroup, Slider,
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
        switchName: 'sidebar',
        currentSwitchItem: 'Include',
        switchItems: ['Include', 'Exclude'],
        localYears: this.years,
        min: 1940,
        max: 2024, // change to a dynamic Date
      }
    },
    methods: {
      hideSidebar() {
        this.currentSwitchItem = 'Include'
        this.$emit('updateDisplayed', this.displayedYears)
        this.$emit('update:years', this.localYears)
        this.$emit('update:show', false)
      },
    },
    computed: {
      // min () {
      //   return this.localYears[0]
      // },
      // max () {
      //   return this.localYears[1]
      // },
      displayedYears () {
        let [left, right] = this.localYears
        if (left === this.min && right === this.max) {
          return 'any'
        } else if (left > this.min && right === this.max) {
          return 'from ' + left
        } else if (right < this.max && left === this.min) {
          return 'to ' + right
        } else {
          return 'from ' + left + ' to ' + right
        }
      }
    }
  }
</script>

<style>
.years {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 50px;
	justify-content: space-around;
	margin: 0 0 10px 0;
  padding: 5px;
}
.years__slider {
  position: absolute;
  margin: 0px 10px;
}
</style>