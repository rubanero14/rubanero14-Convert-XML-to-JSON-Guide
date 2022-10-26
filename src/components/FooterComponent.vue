<template>
    <div>
        <hr class="my-3" size="5" noshade/>
        <button @click="$emit('backwardNav', 'isError')" v-if="this.tabNav > 0 && showLowerBackBtn()" class="btn btn-secondary w-100" :disabled="this.isloading"><i class="bi bi-arrow-left"></i> Back</button>
    </div>
</template>
<script>
export default {
    props: ['tabNav', 'isloading', 'isError', 'topicData', 'feeds'],
    methods: {
        showLowerBackBtn() {
            if (this.tabNav === 1) {
                return this.topicData !== undefined && this.topicData.length > 4;
            }
            if (this.tabNav === 2) {
                return  this.topicData !== undefined && this.feeds.length > 4;
            }
        },
    }
}
</script>