<template>
  <label class="list__item">
    <span class="list__title">{{ name }}</span>
    <input class="list__input" type="checkbox" :checked="checked" @change="this.$emit('checked')">
    <img class="list__img" src="@/assets/check.svg">
  </label>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      checked: {
        type: Boolean,
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