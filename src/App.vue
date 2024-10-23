<template>
  <HeaderBlock/>
  <MainBlock/>
</template>

<script setup>
import HeaderBlock from "@/components/HeaderBlock";
import MainBlock from "@/components/MainBlock";
import { useGlobalStore } from "@/stores/global";
import { onMounted } from "vue";

const globalStore = useGlobalStore()

onMounted(() => {
  globalStore.loadGenres()
  globalStore.loadCountries()
  //Stubs
  // globalStore.loadGenresStub()
  // globalStore.loadCountriesStub()
})

</script>

<style>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
html, body {
}
#app {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  overflow: auto;
  padding: 0px 15px;
  margin: 0px auto;
  box-sizing: content-box;
  line-height: 1;
  background: #16141c;
  font-size: 14px;
  color: #fff;
  font-family: 'Comfortaa', sans-serif;
  letter-spacing: 0.3px;
}
.item {
  background-color: rgb(91 87 107 / 20%);
  margin: 0 0 15px;
  border-radius: 10px;
}
.mini-span {
	color: #a7a4b5;
	font-size: 14px;
}
.switches {
	display: flex;
}
.active {
	background-color: rgb(122, 91, 247);
}
</style>