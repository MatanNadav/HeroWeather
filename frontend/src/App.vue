<template>
  <div id="app">
    <router-view/>
    <Loader v-if="isLoading"></Loader>
  </div>
</template>

<script>
import Loader from "@/components/Loader"
export default {
  data() {
    return {
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.getLoading
    }
  },
  components: {
    Loader
  }
}
</script>

<style>
#app {
  font-family: cursive;
  box-sizing: border-box;
}
body {
  margin: 0;
}

/* Helpers */

.flex {
  display: flex;
}

.row {
    flex-direction: row;
}

.column {
    flex-direction: column;
}

.space-between {
    justify-content: space-between;
}

.space-around {
  justify-content: space-around;
}

.align-center {
    align-items: center;
}

.justify-center {
   justify-content: center;
}

.center {
  justify-content: center;
  align-items: center;
}

</style>
