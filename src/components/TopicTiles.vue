<template>
    <Transition
        :key="this.index"
        appear
        name="fade"
        mode="out-in"
    >
        <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
        <center :style="{ '--i': this.index }">
        <a class="title" @click="$emit('getRssFeeds', topicNavUrl,topic.url,topic.title ), $emit('forwardNav')">
            <CardComponent class="tile mb-3 mx-2">
                <div class="d-inline-block justify-content-center align-items-center m-auto">
                    <img :src="topicNavUrl" onerror="this.src='https://rss.com/favicon.ico'"/>
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