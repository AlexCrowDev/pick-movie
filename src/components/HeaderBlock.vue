<template>
  <header class="header">
			<a href="" class="header__logo">
				Movie Search
			</a>
			<HeaderSearch/>
	</header>
</template>

<script>
	import HeaderSearch from "@/components/HeaderSearch";
	
  export default {
		components: {
      HeaderSearch, 
    },
    data() {
      return {
				
      }
		}
  }
</script>

<style>
.header {
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	justify-content: center;
	margin: 10px 0px;
}
.header__logo {
	font-family: Signika Negative;
	min-width: 130px;
	margin-bottom: 10px;
	font-size: 30px;
	font-weight: 700;
	color: rgb(122, 91, 247);
}
@media (min-width: 502px) {
	.header{
		flex-direction: row;
		justify-content: space-between;
	}
	.header__logo {
		margin-bottom: 0px;
	}
	.header__search {
		max-width: 370px;
		margin: 0px 0px 0px 50px;
	}
}
</style>