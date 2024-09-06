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
        class="YearsSlider"
        v-model="years"
        :step="1"
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
    },
    data() {
      return {
        switchName: 'sidebar',
        currentSwitchItem: 'Include',
        switchItems: ['Include', 'Exclude'],
        years: [1940, 2024],
        min: 1940,
        max: 2024, // change to a dynamic Date
      }
    },
    methods: {
      hideSidebar() {
        this.currentSwitchItem = 'Include'
        this.$emit('updateDisplayed', this.years)
        this.$emit('update:show', false)
      },
    },
    computed: {
      displayedYears () {
        let [left, right] = this.years
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
.YearsSlider {
  position: absolute;
  margin: 0px 10px;
}
</style>