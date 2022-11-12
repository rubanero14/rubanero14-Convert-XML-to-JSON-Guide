<template>
    <div>
        <!-- Header Section -->
        <h1 class="text-secondary mb-1">
          <strong>RSSFeeder<sup>++</sup></strong>
        </h1>
        <label class="text-secondary mb-4">
          <strong>
            Powered by           
            <i class="fa-brands fa-vuejs"></i>&nbsp; 
            <i class="fa-solid fa-rss"></i>&nbsp;
            <i class="fa-brands fa-node-js"></i>
          </strong> 
        </label>
        <div class="alert alert-dark" role="alert">
          Add new feed? Submit a <a target="_blank" class="issue btn-sm btn-secondary" href="/issues">ticket</a>
        </div>
        <a v-if="this.tabNav === 0 && this.showSourceCode" href="https://github.com/rubanero14/rubanero14-Convert-XML-to-JSON-Guide/blob/master/src" class="btn btn-outline-secondary mb-lg-3 w-100" target="_blank"><i class="bi bi-code-slash"></i> Source Code</a>
        <button data-cy ="actions-back-button" v-if="this.tabNav > 0" @click="$emit('backwardNav', this.isError)" class="btn btn-secondary w-100" :disabled="this.isloading"><i class="bi bi-arrow-left"></i> Back</button>
        <hr class="my-3" size="5" noshade/>
    </div>
</template>
<script>
export default {
  props: ['tabNav', 'isloading', 'isError', 'showSourceCode', 'devActivationCount'],
}
</script>
<style scoped>
.issue {
  text-decoration: none;
}
</style>