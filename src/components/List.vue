<template>
  <div class="list">
    <div class="list__title mini-title">All</div>
    <div class="list_body item">
      <template v-for="(item, index) in list">
        <!-- <ListItem v-if="pickedSwitch === 'Choose' && item.visible && !item.excluded"
          :name="item.name"
          :item="item"
          :index="index"
          :list="list"
          :checked="item.included"
          :pickedSwitch="pickedSwitch"
        /> -->
        <ListItem v-if="pickedSwitch === 'Choose'"
          :item="item"
          :checked="item.included"
          :pickedSwitch="pickedSwitch"
        />
        <!-- checked( item, checked) {
          if (this.pickedSwitch === 'Choose') {
            item.include = checked
          } else if (this.pickedSwitch === 'Exclude') {
            item.exclude = checked
          }
        } -->
        <ListItem v-else-if="pickedSwitch === 'Exclude'"
          :item="item"
          :checked="item.excluded"
          :pickedSwitch="pickedSwitch"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import ListItem from "@/components/ListItem.vue";

  export default {
    components: {
      ListItem,
    },
    props: {
      list: {
        type: Array,
        required: true,
      },
      pickedSwitch: {
        type: String,
        required: true,
      },
    },
    methods: {

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
</style>