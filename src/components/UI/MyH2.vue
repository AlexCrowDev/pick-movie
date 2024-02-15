<template>
  <div class="h2">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'my-h2',
  }
</script>

<style scoped>
.h2 {
  display: block;
	color: #a7a4b5;
	font-size: 14px;
	padding: 8px 0px;
}
</style>