<template>
  <RSSFeed />
</template>

<script>
import RSSFeed from "./components/RSSFeed.vue";

export default {
  name: "App",
  components: {
    RSSFeed,
  },
};
</script>

<style>
body {
  background: #333;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f5f5f5;
  margin: 60px auto;
}
</style>
