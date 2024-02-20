<template>
	<div class="fixed-buttom">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'my-fixed-buttom',
  }
</script>

<style>
.fixed-buttom {
	display: flex;
	justify-content: center;
}
</style>