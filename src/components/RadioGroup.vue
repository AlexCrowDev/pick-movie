<template>
	<div class="switches item">
		<my-switch v-for="item in switchItems"
			:key="item"
			:name="switchName"
			:id="item"
			:checked="item === currentSwitchItem"
			@change="$emit('changeCurrent', item)"
		>
			{{ item }}
		</my-switch>
	</div>
</template>

<script setup>
  const props = defineProps({
		currentSwitchItem: {
      type: String,
    },
		switchName: {
      type: String,
    },
    switchItems: {
      type: Object,
    }
  })
</script>

<style>
</style>