<!-- eslint-disable no-prototype-builtins -->
<template>
  <div class="container">
    <div class="row">
      <div
        :class="{ 'col-2': screenWidth >= 1200, '': screenWidth < 1200 }"
      ></div>
      <div :class="{ '': screenWidth < 1200, 'col-8': screenWidth >= 1200 }">
        <HeaderComponent
          class="mb-3"
          @backward-nav="backwardNav(isError)"
          :tabNav="tabNav"
          :isloading="isloading"
          :isError="isError"
          :showSourceCode="showSourceCode"
          :devActivationCount="devActivationCount"
        />
        <loading-spinner :isloading="isloading" :isError="isError" />
        <!-- Sources Tiles Section -->
        <Transition name="card-fade" appear mode="out-in">
          <div v-if="!isloading && tabNav === 0">
            <div class="row mb-3">
              <div class="col-sm-6 text-center">
                <Transition name="fade" appear mode="out-in">
                  <h2 @click="devMode()" class="text-light mb-3">Sources</h2>
                </Transition>
              </div>
              <div class="col-sm-6 text-center">
                <div class="d-flex justify-content-center align-items-center">
                  <label class="me-2">Choose Genre:</label>
                  <select
                    class="form-select w-50"
                    v-model="this.selectGenre"
                    @change="formatSourcesByGenre(this.selectGenre)"
                  >
                    <option value="" selected>All</option>
                    <option value="Finance">Finance</option>
                    <option value="News">News</option>
                    <option value="Tech Education">Tech Education</option>
                    <option value="Defense">Defense</option>
                    <option value="Science">Science</option>
                    <option value="Sports">Sports</option>
                    <option value="Blogs">Blogs</option>
                    <option value="Podcasts">Podcasts</option>
                    <option value="Music">Music</option>
                    <option value="Gaming">Gaming</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <!-- Declaring and assigning index using v-for and use it to assign as key -->
              <div
                v-for="(source, index) in formattedSources"
                :key="index"
                class="d-inline-block"
              >
                <sources-tiles
                  :index="index"
                  :source="source"
                  :topics="topics"
                  :isloading="isloading"
                  :tabNav="tabNav"
                  @forward-nav="forwardNav(source)"
                />
              </div>
            </div>
          </div>
        </Transition>
        <!-- Articles Section -->
        <div v-if="!isError && !isloading && tabNav === 2">
          <Transition name="fade" appear mode="out-in">
            <h2 class="text-light mb-3">{{ topicTitle2 }}</h2>
          </Transition>
          <!-- Declaring and assigning index using v-for and use it to assign as key -->
          <div
            data-cy="actions-article-wrapper"
            class="articles-wrapper"
            v-if="this.feedHasArticles()"
          >
            <div class="mb-2" v-for="(feed, index) in feeds" :key="index">
              <articles-tiles
                :provider="topicTitle"
                :index="index"
                :feed="feed"
                :feeds="this.feeds"
                :data="this.data"
                :screenWidth="screenWidth"
                :pic="pic"
              />
            </div>
          </div>
          <div v-else>
            <card-component
              @click="backwardNav(isError)"
              class="d-flex justify-content-center align-content-center p-4"
            >
              <span class="text-danger mb-0"
                ><strong><em>No articles found here!</em></strong></span
              >
            </card-component>
          </div>
        </div>
        <!-- Topic Tiles Section -->
        <Transition name="card-fade" appear mode="out-in">
          <div v-if="!isloading && tabNav === 1">
            <Transition name="fade" appear mode="out-in">
              <h2 class="text-light mb-3">{{ topicTitle }}</h2>
            </Transition>
            <div>
              <!-- Declaring and assigning index using v-for and use it to assign as key -->
              <div
                v-for="(topic, index) in topicData"
                :key="index"
                class="d-inline-block"
              >
                <topic-tiles
                  :index="index"
                  :topic="topic"
                  :topicNavUrl="topicNavUrl"
                  @get-rss-feeds="
                    getRssFeeds(topicNavUrl, topic.url, topic.title)
                  "
                  @forward-nav="forwardNav()"
                />
              </div>
            </div>
          </div>
        </Transition>
        <error-component
          @backward-nav="backwardNav()"
          :data="data"
          :tabNav="tabNav"
          :isError="isError"
        />
        <footer-component
          @backward-nav="backwardNav(isError)"
          :data="data"
          :tabNav="tabNav"
          :isloading="isloading"
          :sources="sources"
          :isError="isError"
          :topicData="topicData || []"
          :feeds="feeds || []"
        />
      </div>
      <div
        :class="{ 'col-2': screenWidth >= 1200, '': screenWidth < 1200 }"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { UrlEncoder } from "../util";
const xml2js = require("xml2js");
import Sources from "@/assets/sources.js";
import HeaderComponent from "./HeaderComponent.vue";
import ErrorComponent from "./ErrorComponent.vue";
import FooterComponent from "./FooterComponent.vue";
import SourcesTiles from "./SourcesTiles.vue";
import LoadingSpinner from "./UI/LoadingSpinner.vue";
import ArticlesTiles from "./ArticlesTiles.vue";
import TopicTiles from "./TopicTiles.vue";
import CardComponent from "./UI/CardComponent.vue";

export default {
  components: {
    HeaderComponent,
    ErrorComponent,
    FooterComponent,
    SourcesTiles,
    LoadingSpinner,
    ArticlesTiles,
    TopicTiles,
    CardComponent,
  },
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
      devActivationCount: 0,
      formattedSources: [],
      selectGenre: "",
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
    this.formattedSources = Sources;
  },
  unmounted() {
    window.removeEventListener("resize", this.setScreenWidth);
  },
  methods: {
    formatSourcesByGenre(genre) {
      this.formattedSources = [];
      for (let source of Sources) {
        if (genre === "") this.formattedSources = Sources;
        if (source["_genre"].includes(genre)) {
          this.formattedSources.push(source);
        }
      }
    },
    forwardNav(data) {
      if (this.tabNav === 0 && data.topics.length > 1) {
        this.topicTitle = data["name"];
        this.topicData = data.topics;
        this.topicNavUrl = data.url;
        return this.tabNav < 3 ? this.tabNav++ : this.tabNav;
      }
      if (this.tabNav === 0 && data.topics.length === 1) {
        this.topicTitle = data["name"];
        this.pic = data.url;
        this.topicData = data.topics;
        this.topicNavUrl = data.topics[0].url;
        this.topicTitle2 = data.topics[0].title;
        this.getRssFeeds(
          this.pic,
          this.topicNavUrl,
          this.topicTitle2,
          this.logo
        );
        return (this.tabNav = 2);
      }
    },
    backwardNav(err) {
      if (this.tabNav === 2 && this.topicData.length === 1) {
        return (this.tabNav = 0);
      }
      if (err) {
        this.isError = false;
        return (this.tabNav = 0);
      }
      return this.tabNav > -1 ? this.tabNav-- : this.tabNav;
    },
    setScreenWidth() {
      return (this.screenWidth = window.innerWidth);
    },
    async getRssFeeds(picUrl, payloadUrl, title) {
      this.tabNav = 2;
      this.isError = false;
      this.isloading = true;
      this.pic = picUrl;
      this.topicTitle2 = title;
      //Payload for Fetch API setting
      if (
        payloadUrl.includes("tradingeconomics") ||
        payloadUrl.includes("sciencedaily") ||
        payloadUrl.includes("thenewstack")
      ) {
        const payload = `https://cors-anywhere.herokuapp.com/${payloadUrl}`;
        this.data = await axios
          .get(payload)
          .then((response) => {
            return xml2js.parseStringPromise(response.data);
          })
          .catch((err) => {
            this.isloading = false;
            this.isError = true;
            console.log(err);
            return err.message + ",";
          });
      } else {
        const payload = `https://node-simple-rss-feed-proxy-server.onrender.com/${UrlEncoder(
          payloadUrl
        )}`;
        // Fetch API as XML and convert into JSON format
        this.data = await axios
          .get(payload)
          .then((response) => {
            return response.data;
          })
          .catch((err) => {
            this.isloading = false;
            this.isError = true;
            console.log(err);
            return err.message + ",";
          });
      }

      if (this.isError) return;
      const feedsModifier = (data) => {
        if (Object.keys(data).includes("rss")) {
          return data.rss.channel[0].item;
        }

        if (Object.keys(data).includes("rdf:RDF")) {
          return data["rdf:RDF"].item;
        }

        if (Object.keys(data).includes("feed")) {
          return data["feed"].entry;
        }
      };

      this.feeds = feedsModifier(this.data);

      this.feedHasArticles = () => {
        if (Object.keys(this.data).includes("rss")) {
          return Object.keys(this.data.rss.channel[0]).includes("item");
        }

        if (Object.keys(this.data).includes("rdf:RDF")) {
          return Object.keys(this.data["rdf:RDF"]).includes("item");
        }

        if (Object.keys(this.data).includes("feed")) {
          return Object.keys(this.data["feed"]).includes("entry");
        }
      };

      this.isloading = false;
    },
    devMode() {
      this.devActivationCount++;
      if (this.devActivationCount === 7) {
        this.showSourceCode = true;
      }
    },
  },
};
</script>

<style>
h1 {
  font-size: 50px;
}

h2 {
  font-size: 25px;
  font-weight: bold;
}

ul {
  list-style: none;
}

img {
  margin: 5px auto;
  height: 35px;
  width: 35px;
}

img.logo {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  margin: 0;
}

a.title {
  text-decoration: none;
  color: inherit;
}

@media (min-width: 768px) and (max-width: 992px) {
  img.logo {
    border-radius: 12px;
  }
}

@media (min-width: 476px) and (max-width: 768px) {
  img.logo {
    border-radius: 8px;
  }
}

@media (min-width: 300px) and (max-width: 476px) {
  img.logo {
    border-radius: 4px;
  }
}

@media (max-width: 300px) {
  img.logo {
    border-radius: 4px;
  }
}

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 40px;
  }
}

@media only screen and (max-width: 400px) {
  h1 {
    font-size: 30px;
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

.card-fade-enter-to,
.card-fade-leave-from {
  opacity: 1;
}

/* Declared variable --i is used to dynamically calculate transition time */
.fade-enter-active {
  transition: all 0.5s ease-in-out;
  transition-delay: calc(var(--i) * 0.05s);
}

.fade-leave-active {
  transition: all 0.5s ease-in-out;
  transition-delay: calc(var(--i) * 0.05s);
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
</style>
