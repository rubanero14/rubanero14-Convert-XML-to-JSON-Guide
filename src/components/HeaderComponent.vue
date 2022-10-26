<template>
    <div>
        <!-- Header Section -->
        <h1 class="text-secondary mb-1">
          <strong>Latest News Feeds</strong>
        </h1>
        <label class="text-secondary mb-3">
        Powered by <strong><i class="fa-brands fa-vuejs"></i>  <i class="fa-solid fa-rss"></i></strong> and built by <strong><a class="text-secondary" style="text-decoration: none;" href="https://github.com/rubanero14">Raj</a></strong>
        </label>
        <a v-if="this.tabNav === 0 && this.showSourceCode" href="https://github.com/rubanero14/rubanero14-Convert-XML-to-JSON-Guide/blob/master/src" class="btn btn-outline-secondary mb-lg-3 w-100" target="_blank"><i class="bi bi-code-slash"></i> Source Code</a>
        <button v-if="this.tabNav > 0" @click="$emit('backwardNav', this.isError)" class="btn btn-secondary w-100" :disabled="this.isloading"><i class="bi bi-arrow-left"></i> Back</button>
        <hr class="my-3" size="5" noshade/>
    </div>
</template>
<script>
export default {
  props: ['tabNav', 'isloading', 'isError', 'showSourceCode'],
}
</script>