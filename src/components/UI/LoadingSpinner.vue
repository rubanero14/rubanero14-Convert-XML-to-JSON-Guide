<template>
    <!-- Loading Spinner Section -->
    <Transition name="card-fade" appear mode="out-in">
        <div v-if="this.isloading && !this.isError" class="text-center spinner-border text-secondary" role="status">
        </div>
    </Transition>
</template>
<script>
export default {
    props: ['isloading', 'isError']
}
</script>