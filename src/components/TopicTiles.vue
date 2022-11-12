<template>
    <Transition
        :key="this.index"
        appear
        name="fade"
        mode="out-in"
    >
        <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
        <center :style="{ '--i': this.index }">
        <a :data-cy="`actions-topic-${index}`" class="title" @click="$emit('getRssFeeds', topicNavUrl,topic.url,topic.title ), $emit('forwardNav')">
            <CardComponent class="tile mb-3 mx-2 p-3">
                <div class="d-inline-block justify-content-center align-items-center m-0">
                    <img class="favicon" :src="topicNavUrl" onerror="this.src='https://rss.com/favicon.ico'"/>
                    <br/>
                    <strong class="mb-2">
                        <span class="text-secondary title">{{ topic.title }}</span>
                    </strong>
                </div>
            </CardComponent>
        </a>
        </center>
    </Transition>
</template>
<script>
import CardComponent from './UI/CardComponent.vue';
export default {
    props: ['index', 'topic', 'topicNavUrl' ],
    components: { CardComponent },
}
</script>
<style scoped>
.tile {
    min-height: 110px;
    min-width: 220px;
}

h3.title{
    font-size: 18px;
    font-weight:bold;
    margin-bottom: 15px;
}

.favicon {
    border-radius: 4px;
}

@media only screen and (max-width: 600px) {
    span.title {
        font-size: 12px;
    }
}
</style>