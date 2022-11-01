<template>
    <Transition
        :key="this.index"
        appear
        name="fade-articles"
        mode="out-in"
        >
        <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
        <center :style="{ '--j': this.index }">
            <a :data-cy="`actions-article-${index}`" class="title" :href="feed.link.toString()" target="_blank">
                <card-component>
                    <div class="p-3">
                        <div class="row">
                            <div class="col-9 col-md-11 text-start">
                                <h3 class="title text-secondary">
                                    <span v-if="screenWidth >= 1200">{{ feed.title.toString().substr(0, 250).replace(': ','') + '...' }}</span>
                                    <span v-else-if="screenWidth >= 600 && screenWidth < 1200">{{ feed.title.toString().substr(0, 150).replace(': ','') + '...' }}</span>
                                    <span v-else>{{ feed.title.toString().substr(0, 50).replace(': ','') + '...' }}</span>
                                </h3>
                                <p v-if="date()" class="time d-block text-secondary mb-0"><em>Updated: {{ date(index) }} ago</em></p>
                            </div>
                            <div class="wrapper col-3 col-md-1 d-flex align-items-center justify-content-center">
                                <img class="m-auto" v-if="pic" :src="pic" onerror="this.src='https://rss.com/favicon.ico'"/>
                            </div>
                        </div>
                    </div>
                </card-component>
            </a>
        </center>
    </Transition>
</template>
<script>
import Util from '../util';
import CardComponent from './UI/CardComponent.vue';
export default {
    props: ['index', 'feed', 'data', 'feeds', 'screenWidth', 'pic'],
    components: { CardComponent },
    methods: {
        date(){
            this.rssMode = Object.keys(this.data).includes("rss") ? "pubDate" : "dc:date";
            return Util.ElapsedTime(this.feeds[0][this.rssMode]);
        }
    }
}
</script>
<style scoped>
span.time {
    position: absolute;
    bottom: 15px;
    left: 15px;
}

h3.title{
    font-size: 18px;
    font-weight:bold;
    margin-bottom: 15px;
}

  /* Declared variable --j is used to dynamically calculate transition time */
  .fade-articles-enter-active {
    transition: all 0.5s ease-in-out;
    transition-delay: calc(var(--j) * 0.05s);
  }

  .fade-articles-leave-active {
    transition: all 0.3s ease-in-out;
    transition-delay: calc(var(--j) * 0.01s);
  }

  .fade-articles-enter-from {
    opacity: 0;
    transform: translateX(-15px);
  }

  .fade-articles-leave-to {
    opacity: 0;
    transform: translateX(15px);
  }

  .fade-articles-enter-to,
  .fade-articles-leave-from {
    opacity: 1;
  }
</style>