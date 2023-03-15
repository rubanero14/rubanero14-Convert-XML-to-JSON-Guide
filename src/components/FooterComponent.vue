<template>
  <hr class="my-3" size="5" noshade />
  <button
    @click="$emit('backwardNav', 'isError')"
    v-if="this.tabNav > 0 && showLowerBackBtn()"
    class="btn btn-light w-100 mb-4"
    :disabled="this.isloading"
  >
    <i class="bi bi-arrow-left"></i> Back
  </button>
  <footer class="full-length">
    &copy; {{ new Date().getFullYear() }} by
    <strong>
      <a
        target="_blank"
        class="text-light ms-1"
        style="text-decoration: none"
        href="https://github.com/rubanero14/Multi-RSS-News-Feed-Vue3"
        >RUBANERO</a
      >
    </strong>
  </footer>
</template>
<script>
export default {
  props: ["tabNav", "isloading", "isError", "topicData", "feeds", "sources"],
  methods: {
    showLowerBackBtn() {
      if (this.tabNav === 1) {
        return this.topicData !== undefined && this.topicData.length > 4;
      }
      if (this.tabNav === 2) {
        return this.topicData !== undefined && this.feeds.length > 4;
      }
    },
  },
};
</script>
<style scoped>
.full-length {
  display: flex;
  align-self: center;
  justify-content: center;
}
</style>
