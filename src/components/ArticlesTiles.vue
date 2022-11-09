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
                <card-component class="mb-4" v-if="screenWidth <= 768">
                    <div class="row" v-if="titlePic(index, feeds, data)">
                        <div class="col-12">
                            <img class="banner" :src="titlePic(index, feeds, data)">
                        </div>
                    </div>
                    <div class="p-3">
                        <div class="row">
                            <div class="col-12">
                                <h3 class="title text-center text-secondary mb-0">
                                    {{ feed.title.toString() }}
                                </h3>
                            </div>
                            <div class="col-12" v-if="articleDescription(index, feeds, data)">
                                <hr/>
                                <em>
                                    <p class="description text-secondary mb-0" v-if="screenWidth >= 1200">
                                        {{articleDescription(index, feeds, data).toString().substr(0, 800).replace(': ','') + '...'}}<span class="text-primary">read more</span>
                                    </p>
                                    <p class="description text-secondary mb-0" v-else-if="screenWidth >= 600 && screenWidth < 1200">
                                        {{articleDescription(index, feeds, data).toString().substr(0, 400).replace(': ','') + '...'}}<span class="text-primary">read more</span>
                                    </p>
                                    <p class="description text-secondary mb-0" v-else>
                                        {{articleDescription(index, feeds, data).toString().substr(0, 200).replace(': ','') + '...' }}<span class="text-primary">read more</span>
                                    </p>
                                </em>
                            </div>
                            <div class="col-12">
                                <hr/>
                                <div class="d-flex justify-content-between align-contents-center">
                                    <aside v-if="date()" class="time d-flex align-self-end text-secondary mb-0"><em>Updated: {{ date(index) }} ago</em></aside>
                                    <img class="img" v-if="pic" :src="pic" onerror="this.src='https://rss.com/favicon.ico'"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </card-component>
                <card-component class="mb-4" v-else>
                    <div class="d-flex justify-content-center align-items-center">
                        <div v-if="titlePic(index, feeds, data)">
                            <img class="desktop" :src="titlePic(index, feeds, data)">
                        </div>
                        <div class="h-100 p-3">
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="title text-center text-secondary mb-0" v-if="screenWidth >= 1200">
                                        {{ feed.title.toString().substr(0, 800).replace(': ','') + '...' }}
                                    </h3>
                                    <h3 class="title text-center text-secondary mb-0" v-else-if="screenWidth >= 600 && screenWidth < 1200">
                                        {{ feed.title.toString().substr(0, 400).replace(': ','') + '...' }}
                                    </h3>
                                    <h3 class="title text-center text-secondary mb-0"  v-else>
                                        {{ feed.title.toString().substr(0, 200).replace(': ','') + '...' }}
                                    </h3>
                                </div>
                                <div class="col-12" v-if="articleDescription(index, feeds, data)">
                                    <hr/>
                                    <em>
                                        <p class="description text-secondary mb-0" v-if="screenWidth >= 1200">
                                            {{articleDescription(index, feeds, data).toString().substr(0, 800).replace(': ','') + '...'}}<span class="text-primary">read more</span>
                                        </p>
                                        <p class="description text-secondary mb-0" v-else-if="screenWidth >= 600 && screenWidth < 1200">
                                            {{articleDescription(index, feeds, data).toString().substr(0, 400).replace(': ','') + '...'}}<span class="text-primary">read more</span>
                                        </p>
                                        <p class="description text-secondary mb-0" v-else>
                                            {{articleDescription(index, feeds, data).toString().substr(0, 200).replace(': ','') + '...' }}<span class="text-primary">read more</span>
                                        </p>
                                    </em>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-0"/>
                    <div class="d-flex justify-content-between align-content-end p-3">
                        <aside v-if="date()" class="time d-flex align-self-end text-secondary mb-0"><em>Updated: {{ date(index) }} ago</em></aside>
                        <img class="img" v-if="pic" :src="pic" onerror="this.src='https://rss.com/favicon.ico'"/>
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
        },
        titlePic(idx, feeds, data){
            return Util.titlePic(idx, feeds, data)
        },
        articleDescription(idx, feeds, data){
            return Util.articleDescription(idx, feeds, data);
        },
    }
}
</script>
<style scoped>
h3.title{
    font-size: 18px;
    font-weight:bold;
    margin-bottom: 15px;
    text-align: start;
}

p.description{
    text-align: justify;
}

img.banner {
    height: auto;
    width: 100%;
    border-radius: 0;
    margin: 0;
}

img.desktop {
    height: 250px;
    width: 250px;
    border-radius: 0;
    margin: 0;
}

img.img {
    height: 35px;
    width: 35px;
    border-radius: 4px;
    margin: 0;
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