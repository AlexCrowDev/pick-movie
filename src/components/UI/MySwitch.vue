<template>
  <div class="switch">
    <input
      class="switch__input"
      type="radio"  
      :name="name" 
      :id="id" 
    />
    <label class="switch__label" :for="id">
      <slot></slot>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'my-switch',
    props: {
      id: {
        type: String,
        reqvired: true,
      },
      name: {
        type: String,
        reqvired: true,
      },
    }
  }
</script>

<style scoped>
.switch {
  width: 100%;
}
.switch__label {
  display: flex;
	align-items: center;
	justify-content: center;
	min-height: 40px;
	border-radius: 10px;
}
.switch__input {
	display: none;
}
.switch__input:checked  + .switch__label {
	background: rgb(122, 91, 247);
}
</style>