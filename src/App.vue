<template>
  <HeaderBlock/>
</template>

<script>
  import HeaderBlock from "@/components/HeaderBlock";
  export default {
    components: {
      HeaderBlock,
    }
  }
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
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
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
.focused {
	background-color: rgb(122, 91, 247);
}
</style>