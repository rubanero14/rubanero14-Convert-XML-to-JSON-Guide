<template>
    <Transition
        appear
        :key="index"
        name="fade" 
        mode="out-in"
    >
        <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
        <center :style="{ '--i':index }">
        <a class="title" @click="$emit(`forwardNav`,source)">
            <card-component class="logo p-0 mb-3 mx-2">
                <div class="d-contents">
                    <img class="logo" :src="source.logo" onerror="this.src='https://rss.com/favicon.ico'"/>
                </div>
            </card-component>
        </a>
        </center>
    </Transition>
</template>
<script>
import CardComponent from './UI/CardComponent.vue';
export default {
    props:["source", "isloading", "tabNav"],
    components: { CardComponent },
}
</script>