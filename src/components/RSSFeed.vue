<template>
  <div class="container">
    <div class="row">
      <div :class="{'col-3':screenWidth >= 1200, '':screenWidth < 1200}"></div>
      <div :class="{'':screenWidth < 1200, 'col-6':screenWidth >= 1200}">
        <HeaderComponent @backward-nav="backwardNav(isError)" :tabNav="tabNav" :isloading="isloading" :isError="isError" :showSourceCode="showSourceCode" />
        <loading-spinner :isloading="isloading" :isError="isError" />
        
        <!-- Sources Tiles Section -->
        <Transition name="card-fade" appear mode="out-in">
            <div v-if="!isloading && tabNav === 0">
              <Transition name="fade" appear mode="out-in">
                  <h2 @click="$emit('devMode')" class="text-secondary mb-3">Sources</h2>
              </Transition>
              <div>
                  <!-- Declaring and assigning index using v-for and use it to assign as key -->
                  <div v-for="(source, index) in sources" :key="index" class="d-inline-block">
                    <sources-tiles :source="source" :topics="topics" :isloading="isloading" :tabNav="tabNav" @forward-nav="forwardNav(source)"/>
                  </div> 
              </div>
            </div>
        </Transition>
       
        <!-- Articles Section -->
        <div v-if="!isError && !isloading && tabNav === 2">
          <Transition name="fade" appear mode="out-in">
            <h2 class="text-secondary mb-3">{{ topicTitle2 }}</h2>
          </Transition>
          <!-- Declaring and assigning index using v-for and use it to assign as key -->
          <div class="articles-wrapper" v-if="this.feedHasArticles()">
            <div class="mb-2" v-for="(feed, index) in feeds" :key="index">
              <articles-component :index="index" :feed="feed" :feeds="feeds" :data="data" :screenWidth="screenWidth" :pic="pic"/>
            </div>
          </div>
          <div v-else>
            <div  @click="backwardNav(isError)" class="card d-flex justify-content-center align-content-center p-4">
              <span class="text-danger mb-0"><strong><em>No articles found here!</em></strong></span>
            </div> 
          </div>
        </div>
        
        <!-- Topic Tiles Section -->
        <Transition name="card-fade" appear mode="out-in">
            <div v-if="!isloading && tabNav === 1">
              <Transition name="fade" appear mode="out-in">
                <h2 class="text-secondary mb-3">{{ topicTitle }}</h2>
              </Transition>
              <div>
                  <!-- Declaring and assigning index using v-for and use it to assign as key -->
                  <div v-for="(topic,index) in topicData" :key="index" class="d-inline-block">
                    <topic-tiles :index="index" :topic="topic" :topicNavUrl="topicNavUrl" @get-rss-feeds="getRssFeeds(topicNavUrl,topic.url,topic.title)" @forward-nav="forwardNav()"/>
                  </div>
              </div>
            </div>
        </Transition>
        
        <error-component @backward-nav="backwardNav()" :data="data" :tabNav="tabNav" :isError="isError"/>
        <footer-component @backward-nav="backwardNav(isError)" :data="data" :tabNav="tabNav" :isError="isError" :topicData="topicData || []" :feeds="feeds || []" />
        
      </div>
      <div :class="{'col-3':screenWidth >= 1200, '':screenWidth < 1200}"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const xml2js = require('xml2js');

import sources from '@/assets/sources.js';
import HeaderComponent from './HeaderComponent.vue';
import ErrorComponent from './ErrorComponent.vue';
import FooterComponent from './FooterComponent.vue';
import SourcesTiles from './SourcesTiles.vue';
import LoadingSpinner from './UI/LoadingSpinner.vue';
import ArticlesComponent from './ArticlesComponent.vue';
import TopicTiles from './TopicTiles.vue';

export default {
    components: { HeaderComponent, ErrorComponent, FooterComponent, SourcesTiles, LoadingSpinner, ArticlesComponent, TopicTiles },
    data() {
        return {
            data: "",
            isloading: false,
            isError: false,
            rssSource: "",
            screenWidth: "",
            tabNav: 0,
            topicData: "",
            topicNavUrl: "",
            topicTitle: "",
            topicTitle2: "",
            sources: sources,
            showSourceCode: false,
            devActivationCount: 0,
        };
    },
    watch: {
        url() {
            this.getRssFeeds();
            this.setScreenWidth();
        },
    },
    mounted() {
        window.addEventListener("resize", this.setScreenWidth);
        this.setScreenWidth();
    },
    unmounted() {
        window.removeEventListener("resize", this.setScreenWidth);
    },
    methods: {
        devMode() {
            this.devActivationCount++;
            if (this.devActivationCount === 7) {
                this.showSourceCode = true;
            }
        },
        forwardNav(data) {
            if (this.tabNav === 0 && data.topics.length > 1) {
                this.topicData = data.topics;
                this.topicNavUrl = data.url;
                this.topicTitle = data.name;
                return this.tabNav < 3 ? this.tabNav++ : this.tabNav;
            }
            if (this.tabNav === 0 && data.topics.length === 1) {
                this.pic = data.url;
                this.topicData = data.topics;
                this.topicNavUrl = data.topics[0].url;
                this.topicTitle2 = data.topics[0].title;
                this.getRssFeeds(this.pic, this.topicNavUrl, this.topicTitle2);
                return this.tabNav = 2;
            }
        },
        backwardNav(err) {
            if (this.tabNav === 2 && this.topicData.length === 1) {
                return this.tabNav = 0;
            }
            if (err) {
                this.isError = false;
                console.log("Iserror ", this.isError);
                return this.tabNav = 0;
            }
            return this.tabNav > -1 ? this.tabNav-- : this.tabNav;
        },
        setScreenWidth() {
            console.log(window.innerWidth);
            return this.screenWidth = window.innerWidth;
        },
        async getRssFeeds(picUrl, payloadUrl, title) {
            this.tabNav = 2;
            this.isError = false;
            this.isloading = true;
            this.pic = picUrl;
            this.topicTitle2 = title;
            // Payload for Fetch API setting
            let payload = `https://cors-anywhere.herokuapp.com/${payloadUrl}`;
            // Fetch API as XML and convert into JSON format
            this.data = await axios
                .get(payload)
                .then((response) => {
                return xml2js.parseStringPromise(response.data);
            })
                .catch(err => {
                this.isloading = false;
                this.isError = true;
                console.log(err);
                return err.message + ",";
            });
            if (this.isError)
                return;
            this.feeds = Object.keys(this.data).includes("rss") ? this.data.rss.channel[0].item : this.data["rdf:RDF"].item;
            this.feedHasArticles = () => {
                if (Object.keys(this.data).includes("rss"))
                    return Object.keys(this.data.rss.channel[0]).includes("item");
                if (Object.keys(this.data).includes("rdf:RDF"))
                    return Object.keys(this.data["rdf:RDF"]).includes("item");
            };
            this.isloading = false;
        },
    },
}
</script>

<style>
  h1 {
    font-size: 50px;
  }

  h2 {
    font-size: 25px;
    font-weight: bold;
  }

  .tile {
    min-height: 115px;
    min-width: 220px;
  }

  .right {
    border-radius: 0px 4px 4px 0px;
  }

  ul {
    list-style: none;
  }

  img {
    margin: 5px auto;
    width: 35px;
    border-radius: 4px;
  }

  img.logo {
    height: 100%;
    width: 100%;
    margin: 0;
    border-radius: 4px;

  }

  .d-contents {
    display: contents;
  }

  h3.title{
    font-size: 18px;
    font-weight:bold;
    margin-bottom: 15px;
  }

  a.title {
    text-decoration: none;
    color: inherit;
  }

  span.time {
    position: absolute;
    bottom: 15px;
    left: 15px;
  }

  .card {
    cursor: pointer;
    box-shadow: 0px 1px 4px 0px rgb(0 0 0 / 20%);
    border-radius: 5px;
    overflow: hidden;
  }

  .card.logo {
    height: 120px;
    width: 120px;
    border-radius: 8px;
  }

  .card:hover {
    background: rgba(0,0,0,.05);
  }

  .card.logo:hover {
    box-shadow: 0px 2px 8px 8px rgb(0 0 0 / 20%);
  }

  .tile {
    min-height: 108px;
  }

  .err {
    width: 100%;
    border: 1px solid #dc3545;
  }

  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 40px;
    }

    span.title {
      font-size: 12px;
    }

    .card.logo {
      height: 80px;
      width: 80px;
      border-radius: 4px;
    }
  }

  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 30px;
    }

    .card.logo {
      height: 70px;
      width: 70px;
    }
  }

  @media only screen and (max-width: 300px) {
    .card.logo {
      height: 60px;
      width: 60px;
    }
  }
  
  .card-fade-enter-active {
    transition: all 0.5s ease-in-out;
  }

  .card-fade-leave-active {
    transition: all 0.5s ease-in-out;
  }

  .card-fade-enter-from,
  .card-fade-leave-to {
    opacity: 0;
  }

  .card-fade-enter-to, .card-fade-leave-from {
    opacity: 1;
  }
  
  /* Declared variable --i is used to dynamically calculate transition time */
  .fade-enter-active {
    transition: all 0.5s ease-in-out;
    transition-delay: calc(var(--i) * 0.15s);
  }

  .fade-leave-active {
    transition: all 0.5s ease-in-out;
    transition-delay: calc(var(--i) * 0.15s);
    
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateX(-15px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(15px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
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