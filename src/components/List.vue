<template>
  <div class="list">
    <div class="list__title mini-title">All</div>
    <div class="list_body item">
      <template v-for="(item, index) in list" :key="item.id">
        <ListItem v-if="currentSwitchItem === 'Include'"
          :name="item.name"
          :checked="item.included"
          @checked="updateIncluded(item)"
        />
        <ListItem v-else
          :name="item.name"
          :checked="item.excluded"
          @checked="updateExcluded(item)"
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
      currentSwitchItem: {
        type: String,
        required: true,
      },
    },
    methods: {
      updateIncluded(item) {
        item.included = !item.included
      },
      updateExcluded(item) {
        item.excluded = !item.excluded
      }
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