<template>
  <Transition :key="this.index" appear name="fade-articles" mode="out-in">
    <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
    <center :style="{ '--j': this.index }">
      <a
        :data-cy="`actions-article-${index}`"
        class="title"
        :href="link(feed.link)"
        target="_blank"
      >
        <article>
          <card-component class="mb-4" v-if="screenWidth <= 768">
            <div class="row" v-if="titlePic(index, feeds, data)">
              <div class="col-12">
                <div class="d-flex justify-content-center align-items-center">
                  <iframe
                    class="banner"
                    :src="titlePic(index, feeds, data)"
                    frameborder="0"
                    v-if="titlePic(index, feeds, data).includes('youtube')"
                  ></iframe>
                  <audio
                    class="banner"
                    controls
                    :src="titlePic(index, feeds, data)"
                    v-else-if="titlePic(index, feeds, data).includes('.mp3')"
                  >
                    <a :href="titlePic(index, feeds, data)"> Download </a>
                  </audio>
                  <img
                    class="banner"
                    :src="titlePic(index, feeds, data)"
                    onerror="this.style='display: none'"
                    v-else
                  />
                </div>
                <hr v-if="titlePic(index, feeds, data).includes('.mp3')" />
              </div>
            </div>
            <div class="p-3">
              <div class="row">
                <div class="col-12">
                  <h3
                    class="title text-center text-dark mb-0"
                    v-html="feed.title"
                  ></h3>
                </div>
                <div
                  class="col-12"
                  v-if="articleDescription(index, feeds, data)"
                >
                  <hr />
                  <em>
                    <p
                      class="description text-dark mb-0"
                      v-html="articleInjector()"
                    ></p>
                  </em>
                </div>
                <div class="col-12">
                  <hr />
                  <div
                    class="d-flex justify-content-between align-contents-center"
                  >
                    <img
                      class="img"
                      v-if="pic"
                      :src="pic"
                      onerror="this.src='https://rss.com/favicon.ico'"
                    />
                    <aside
                      v-if="date"
                      class="time d-flex align-items-center text-secondary mb-0"
                    >
                      <em
                        ><strong
                          >{{ this.provider }} &#183;
                          {{ date(index) }} ago</strong
                        ></em
                      >
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </card-component>
          <card-component class="mb-4" v-else>
            <div class="row pe-0">
              <div
                class="col-6 d-flex justify-content-center align-items-center"
                v-if="titlePic(index, feeds, data)"
              >
                <iframe
                  class="banner"
                  :src="titlePic(index, feeds, data)"
                  frameborder="0"
                  v-if="titlePic(index, feeds, data).includes('youtube')"
                ></iframe>
                <audio
                  class="banner"
                  controls
                  :src="titlePic(index, feeds, data)"
                  v-else-if="titlePic(index, feeds, data).includes('.mp3')"
                >
                  <a :href="titlePic(index, feeds, data)"> Download </a>
                </audio>
                <img
                  class="banner"
                  :src="titlePic(index, feeds, data)"
                  onerror="this.style='display: none'"
                  v-else
                />
              </div>
              <div
                class="ps-0"
                :class="{
                  'col-6': titlePic(index, feeds, data),
                  'col-12': !titlePic(index, feeds, data),
                }"
              >
                <div class="row h-100 ps-0">
                  <div
                    class="col-12 p-3 d-flex justify-content-center align-items-center"
                  >
                    <h3
                      class="title mx-3 text-center text-dark mb-0"
                      v-html="feed.title"
                    ></h3>
                  </div>
                  <hr
                    v-if="articleDescription(index, feeds, data)"
                    class="my-0"
                  />
                  <div
                    class="col-12 p-3"
                    v-if="articleDescription(index, feeds, data)"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <em
                        class="desc p-3"
                        :class="{
                          'ms-3': !titlePic(index, feeds, data),
                          '': titlePic(index, feeds, data),
                        }"
                      >
                        <p
                          class="description text-center text-dark mb-0"
                          v-if="screenWidth >= 1200"
                          v-html="articleInjector()"
                        ></p>
                        <p
                          class="description text-center text-dark mb-0"
                          v-else-if="screenWidth >= 768 && screenWidth < 1200"
                          v-html="articleInjector()"
                        ></p>
                      </em>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-0" />
            <div
              class="d-flex justify-content-between align-content-end px-3 py-2"
            >
              <img
                class="img"
                v-if="pic"
                :src="pic"
                onerror="this.src='https://rss.com/favicon.ico'"
              />
              <aside
                v-if="date"
                class="time d-flex align-items-center text-secondary mb-0"
              >
                <em
                  ><strong
                    >{{ this.provider }} &#183; {{ date(index) }} ago
                  </strong></em
                >
              </aside>
            </div>
          </card-component>
        </article>
      </a>
    </center>
  </Transition>
</template>
<script>
import {
  articleLink,
  ElapsedTime,
  titlePic,
  articleDescription,
} from "../util";
import CardComponent from "./UI/CardComponent.vue";
export default {
  props: ["index", "feed", "data", "feeds", "screenWidth", "pic", "provider"],
  components: { CardComponent },
  data() {
    return {
      articleDesktop: "",
      articleMobile: "",
    };
  },
  methods: {
    link(data) {
      return articleLink(data);
    },
    date() {
      const rssMode = (data) => {
        if (Object.keys(data).includes("rss")) {
          return "pubDate";
        }

        if (Object.keys(data).includes("rdf:RDF")) {
          return "dc:date";
        }

        if (Object.keys(data).includes("feed")) {
          return "updated";
        }
      };

      this.rssMode = rssMode(this.data);
      return ElapsedTime(this.feeds[0][this.rssMode]);
    },
    titlePic(idx, feeds, data) {
      return titlePic(idx, feeds, data);
    },
    articleDescription(idx, feeds, data) {
      return articleDescription(idx, feeds, data);
    },
    articleInjector() {
      if (this.screenWidth >= 1200) {
        return (this.articleDesktop = `${
          this.articleDescription(this.index, this.feeds, this.data)
            .toString()
            .substr(0, 200)
            .replace(": ", "") + "..."
        }<span class="text-primary">read more</span>`);
      }
      if (this.screenWidth >= 768 && this.screenWidth < 1200) {
        return (this.articleDesktop = `${
          this.articleDescription(this.index, this.feeds, this.data)
            .toString()
            .substr(0, 100)
            .replace(": ", "") + "..."
        }<span class="text-primary">read more</span>`);
      }
      if (this.screenWidth < 768) {
        return (this.articleMobile = `${
          this.articleDescription(this.index, this.feeds, this.data)
            .toString()
            .substr(0, 100)
            .replace(": ", "") + "..."
        }<span class="text-primary">read more</span>`);
      }
    },
  },
};
</script>
<style scoped>
hr {
  background: #333;
}
em.desc {
  width: fit-content;
}

h3.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: start;
}

aside {
  font-size: 15px;
}

audio.banner {
  margin: 15% auto;
}

p.description {
  text-align: justify;
}

iframe.banner,
img.banner {
  height: 100%;
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
