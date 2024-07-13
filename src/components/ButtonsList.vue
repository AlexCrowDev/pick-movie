<template>
	<div class="show__main item">
		<a v-for="buttonInfo, button  in buttons"
			:key="button"
			href=""
			class="show__main-button"
			@click.prevent="$emit('openSidebar', button)"
		>
			{{ button }}
		<span class="mini-span">{{ buttonInfo }}</span>
  </a>
	</div>
</template>

<script setup>
  const props = defineProps({
    buttons: {
      type: Object,
    }
  })
</script>

<style>
.show__main-button {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	padding: 0px 14px;
	min-height: 45px;
}
.show__main-button:not(:last-child) {
	border-bottom: 1px solid rgb(91 87 107 / 50%);
}
.show__main-button:first-child {
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
.show__main-button:last-child {
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
}
</style>