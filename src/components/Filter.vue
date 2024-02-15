<template>
  <div class="filter">
    <div class="show">
      <my-h2>Show</my-h2>
      <div class="switches item">
        <my-switch :name="name" id="All">All</my-switch>
        <my-switch :name="name" id="Films">Films</my-switch>
        <my-switch :name="name" id="TV Series">TV Series</my-switch>
      </div>
      <div class="show__main item">
        <a href="" class="show__main-button" data-page="genres">
          <span>Genres</span>
          <span class="mini-span">all</span>
        </a>
        <a href="" class="show__main-button" data-page="countries">
          <span>Country</span>
          <span class="mini-span">all</span>
        </a>
        <a href="" class="show__main-button" data-page="years">
          <span>Year</span>
          <span class="mini-span">all</span>
        </a>
      </div>
    </div>
    <my-button>Show</my-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: 'show',
      }
    }
}
</script>

<style scoped>
.filter {
	/* display: none; */
}
.active {
	display: block;
}
.show {
}
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