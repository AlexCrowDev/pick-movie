<template>
    <div class="range item">
      <div class="range__info">
        <slot></slot>
        <span class="mini-span">{{ displayedInfo }}</span>
      </div>
      <Slider
        class="slider"
        v-model="localValue"
        range
        :min
        :max
        @change="emits"
      />
    </div>
</template>

<script>
  import Slider from 'primevue/slider';

  export default {
    components: {
      Slider,
    },
    props: {
      modelValue: {
        type: Array,
        default: [1, 10]
      },
    },
    data() {
      return {
        localValue: this.modelValue,
        min: this.modelValue[0],
        max: this.modelValue[1]
      }
    },
    methods: {
      emits() {
        this.$emit('update:modelValue', this.localValue)
        this.$emit('change', this.displayedInfo)
      }
    },
    computed: {
      displayedInfo () {
        let [left, right] = this.localValue
        
        if (left > right) {
          [left, right] = [right, left] 
        }
        
        if (left === this.min && right === this.max) {
          return 'any'
        } else if (left > this.min && left != right && right === this.max) {
          return `from ${left}`
        } else if (right < this.max && left != right && left === this.min) {
          return `to ${right}`
        } else if ( left === right ) {
          return `${right}`
        } else {
          return `from ${left} to ${right}`
        }
      }
    }
  }
</script>

<style>
.range {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  min-height: 60px;
  padding: 5px 14px;
}
.range__info {
  display: flex;
	justify-content: space-between;
	align-items: center;
  text-align: center;
	background-color: transparent;
  flex-direction: row;
}
.slider {
  position: absolute;
  margin: 0px 10px;
}
</style>