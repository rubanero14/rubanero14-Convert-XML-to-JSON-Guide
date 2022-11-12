<template>
    <Transition
        appear
        :key="this.index"
        name="fade" 
        mode="out-in"
    >
        <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
        <center :style="{ '--i': this.index }">
        <a :data-cy="`actions-source-${index}`" class="title" @click="$emit(`forwardNav`,source)">
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
    props:["source", "isloading", "tabNav", "index"],
    components: { CardComponent },
}
</script>
<style scoped>
.d-contents {
    display: contents;
}

img.logo {
    height: 120px;
    width: 120px;
    border-radius: 20px;
}

@media (min-width: 768px) and (max-width: 992px) {
    img.logo {
        height: 80px;
        width: 80px;
        border-radius: 12px;
    }
}
@media (min-width: 476px) and (max-width: 768px) {
    img.logo {
        height: 70px;
        width: 70px;
        border-radius: 8px;
    }
}

@media (min-width: 300px) and (max-width: 476px) {
    img.logo {
        height: 50px;
        width: 50px;
        border-radius: 4px;
    }
}

@media (max-width: 300px) {
    img.logo {
        height: 40px;
        width: 40px;
        border-radius: 4px;
    }
}
</style>