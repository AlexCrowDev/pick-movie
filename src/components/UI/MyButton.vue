<template>
	<a
		href=""
		class="btn"
		@click.prevent="clickMethod">
		<slot></slot>
	</a>
</template>

<script>
  export default {
    name: 'my-button',
		props: {
			clickMethod: {
				type: Function,
			}
		}
  }
</script>

<style scoped>
.btn {
	display: flex;
	min-height: 40px;
	width: 230px;
	align-items: center;
	justify-content: center;
	margin: 5px 0px 15px;
	background-color: rgb(122, 91, 247);
	transition: background-color 0.2s ease;
	border-radius: 50px;
}
</style>