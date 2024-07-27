<template>
	<div class="fixed-button">
		<my-button>
			<slot></slot>
		</my-button>
	</div>
</template>

<script>
  export default {
    name: 'fixed-button',
  }
</script>

<style>
.fixed-button {
	display: flex;
	justify-content: center;
}
</style>