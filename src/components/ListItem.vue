<template>
  <label class="list__item">
    <span class="list__title">{{ item.name }}</span>
    <input class="list__input" type="checkbox" :checked="checked" @change="checkboxChangeEventHandler($event)">
    <img class="list__img" src="@/assets/check.svg">
  </label>
</template>

<script>
  export default {
    props: {
      // id: {
      //   type: Number,
      //   required: true
      // },
      // name: {
      //   type: String,
      //   required: true
      // },
      item: {
        type: Object,
        required: true,
      },
      checked: {
        type: Boolean,
      },
      pickedSwitch: {
        type: String,
        required: true,
      },
    },
    methods: {
      checkboxChangeEventHandler(event) {
        // let event = {
        //   item: this.item,
        //   checked: event.target.checked
        // }
        // this.$emit('checked', item, event.target.checked)
        if (this.pickedSwitch === 'Choose') {
          this.item.included = event.target.checked
        } else if (this.pickedSwitch === 'Exclude') {
          this.item.excluded = event.target.checked
        }
      },
    },
  }
</script>

<style>
.list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px 0px 14px;
  height: 45px;
}
.list__item:not(:last-child) {
  border-bottom: 1px solid rgba(91, 87, 107, 0.447);
}
.list__title {
}
.list__input {
  display: none;
}
.list__img {
  display: none;
  width: 34px;
  height: 34px;
}
.list__input:checked + .list__img {
  display: block;
}
</style>