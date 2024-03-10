<template>
    <div class="list">
      <div class="list__title mini-title">All</div>
      <div class="list_body item">
        <label class="list__item" v-for="(item, index) in list">
          <span class="list__span">{{ item.name }}</span>
          <input class="list__input" type="checkbox" :checked="item.checked" @change="updateChecked(index)">
          <img class="list__img" src="@/assets/check.svg">
        </label>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        reqvired: true,
      },
    },
    methods: {
      updateChecked(index) {
        this.list[index].checked = !this.list[index].checked
      },
    },
  }
</script>

<style scoped>
.list__title {
}
.mini-title {
  color: #a7a4b5;
  font-size: 14px;
  padding: 8px 0px;
}
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
.list__span {
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