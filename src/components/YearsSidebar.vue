<template>
  <div class="sidebar" v-if="show">
    <div class="sidebar__switches">
      <div class="switches item">
        <my-switch :name="switchName" v-model="pickedSwitch" id="Included" checked>Choose</my-switch>
        <my-switch :name="switchName" v-model="pickedSwitch" id="Excluded">Exclude</my-switch>
      </div>
    </div>
    <my-fixed-buttom>
      <my-button @click.prevent="hideSidebar">Show</my-button>
    </my-fixed-buttom>
  </div>
</template>

<script>
  import Search from "@/components/Search";

  export default {
    components: {
      Search,
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
        pickedSwitch: 'Included',
      }
    },
    methods: {
      hideSidebar() {
        this.pickedSwitch = 'Included'
        this.$emit('update:show', false)
      },
    },
    computed: {

    },
  }
</script>

<style>

</style>