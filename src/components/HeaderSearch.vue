<template>
  <form class="header__search">
    <div class="header__search-icon">
      <img src="@/assets/search_google.svg" alt="">
    </div>
    <input class="header__search-input search__input" type="text" placeholder="Films, TV Series, Cartoons">
    <div >
      <a href="" class="header__search-button">
        <img src="@/assets/googleFilter.svg" alt="">
      </a>
    </div>
  </form>
</template>

<script>
  export default {
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
.header__search {
	background-color: rgba(91, 87, 107, 20%);
  display: flex;
  width: 100%;
  max-height: 40px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
}
.header__search-icon {
  height: 100%;
	padding: 8px;
}
.header__search-input {
  width: 100%;
  height: 100%;
	padding: 8px;
	background: transparent;
	font-weight: 300;
	font-family: 'Comfortaa', sans-serif;
	color: #fff;
	border: none;
	outline: none;
	font-size: 16px;
}
.header__search-input::placeholder {
	color: rgba(200, 196, 213, 0.822);
}
.header__search-button {
  display: block;
  max-height: 40px;
	padding: 8px;
}
.header__search-button:active {
	background-color: rgb(122, 91, 247);
	border-top-right-radius: 12px;
	border-bottom-right-radius: 12px;
}
@media (min-width: 502px) {
	.header__search {
		max-width: 370px;
		margin: 0px 0px 0px 50px;
	}
}
</style>