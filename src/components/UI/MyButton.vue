<template>
	<div class="fixed-buttom">
		<a href="" class="btn">
    	<slot></slot>
  	</a>
	</div>
</template>

<script>
  export default {
    name: 'my-button',
  }
</script>

<style scoped>
.fixed-buttom {
	display: flex;
	justify-content: center;
	width: 100%;
}
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