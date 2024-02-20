<template>
    <div class="search">
      <div class="search-icon">
        <img src="@/assets/search_google.svg" alt="">
      </div>
      <input
        class="search-input" 
        type="text"
        :placeholder="placeholder"
        @input="getValue"
      >
    </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        reqvired: true,
      },
    },
    data() {
      return {
        value:'',
      }
    },
    methods: {
      getValue(event) {
        this.value = event.target.value
        this.$emit('get', this.value)
      },
    },
  }
</script>

<style scoped>
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 40px;
    border-radius: 12px;
    background-color: rgba(91, 87, 107, 20%);
    padding: 8px;
    gap: 8px;
    font-weight: 300;
    font-family: 'Comfortaa', sans-serif;
    color: #fff;
    border: none;
    outline: none;
    font-size: 16px;
}
.search-icon {
  /* height: 100%; */
	/* padding: 8px; */
}
.search-input {
  width: 100%;
  /* height: 100%;
	padding: 8px; */
	background: transparent;
	font-weight: 300;
	font-family: 'Comfortaa', sans-serif;
	color: #fff;
	border: none;
	outline: none;
	font-size: 16px;
}
.search-input::placeholder {
	color: rgba(200, 196, 213, 0.822);
}
</style>