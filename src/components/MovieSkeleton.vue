<template>
  <div v-for="n in 6" :key="n" class="movie">
    <Skeleton
      width="158px"
      height="237px"
      borderRadius="10px"
		/>
    <div class="movie__info">
      <Skeleton
      class="movie__name"
      width="80%"
      height="8px"
      borderRadius="10px"
		/>
    <Skeleton
      width="50%"
      height="8px"
      borderRadius="10px"
		/>
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";
  export default {
    components: {
      Skeleton,
    },
    props: {

    },
    data() {
      return {
        
      }
    }
  }
</script>

<style scoped>

</style>