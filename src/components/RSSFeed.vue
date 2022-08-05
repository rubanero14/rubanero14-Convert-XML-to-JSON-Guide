<template>
  <div class="container">
    <div class="row">
      <div :class="{'col-3':screenWidth >= 1200, '':screenWidth < 1200}"></div>
      <div :class="{'':screenWidth < 1200, 'col-6':screenWidth >= 1200}">
        <!-- Header Section -->
        <h1 class="text-secondary mb-3"><strong>RSS Feed - Vue 3</strong></h1>

        <a v-if="tabNav === 0" href="https://github.com/rubanero14/rubanero14-Convert-XML-to-JSON-Guide/blob/master/src/components/RSSFeed.vue" class="btn btn-outline-secondary mb-lg-3 w-100" target="_blank"><i class="bi bi-code-slash"></i> Source Code</a>
        
        <button v-if="tabNav > 0" @click="backwardNav(isError)" class="btn btn-secondary w-100" :disabled="isloading"><i class="bi bi-arrow-left"></i> Back</button>
        
        <hr class="my-3" size="5" noshade/>
        
        <!-- Loading Spinner Section -->
        <div v-if="isloading" class="text-center spinner-border text-secondary" role="status">
        </div>
        
        <!-- Sources Tiles Section -->
        <Transition name="card-fade" appear mode="out-in">
          <div v-if="!isloading && tabNav === 0">
            <Transition name="fade" appear mode="out-in">
              <h2 class="text-secondary mb-3">Sources</h2>
            </Transition>
            <div>
              <!-- Declaring and assigning index using v-for and use it to assign as key -->
              <div v-for="(source, index) in sources" :key="index" class="d-inline-block">
                <Transition
                  appear
                  :key="index"
                  name="fade" 
                  mode="out-in"
                >
                  <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
                  <center :style="{ '--i':index }">
                    <a class="title" @click="forwardNav(source)">
                      <div class="card logo p-0 mb-3 mx-2">
                        <div class="d-inline-block justify-content-center align-items-center">
                          <img class="logo" :src="source.logo" onerror="this.src='https://rss.com/favicon.ico'"/>
                        </div>
                      </div>
                    </a>
                  </center>
                </Transition>
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
          <div class="mb-2" v-for="(feed, index) in feeds" :key="index">
            <Transition
              :key="index"
              appear
              name="fade-articles"
              mode="out-in"
            >
              <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
              <center :style="{ '--j':index }">
                <a class="title" :href="feed.link.toString()">
                  <div class="card">
                    <div class="p-3">
                      <div class="row">
                        <div class="col-9 col-md-11 text-start">
                          <h3 class="title text-secondary">
                            <span v-if="screenWidth >= 1200">{{ feed.title.toString().substr(0, 250).replace(': ','') + '...' }}</span>
                            <span v-else-if="screenWidth >= 600 && screenWidth < 1200">{{ feed.title.toString().substr(0, 150).replace(': ','') + '...' }}</span>
                            <span v-else>{{ feed.title.toString().substr(0, 50).replace(': ','') + '...' }}</span>
                          </h3>
                          <p v-if="date()" class="time d-block text-secondary mb-0"><em>Updated: {{ date() }} ago</em></p>
                        </div>
                        <div class="wrapper col-3 col-md-1 d-flex align-items-center justify-content-center">
                          <img class="m-auto" v-if="pic" :src="pic" onerror="this.src='https://rss.com/favicon.ico'"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </center>
            </Transition>
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
                    <Transition
                      :key="index"
                      appear
                      name="fade"
                      mode="out-in"
                    >
                      <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
                      <center :style="{ '--i':index }">
                        <a class="title" @click="getRssFeeds(topicNavUrl,topic.url,topic.title) && forwardNav()">
                          <div class="card tile mb-3 mx-2">
                            <div class="d-inline-block justify-content-center align-items-center m-auto">
                              <img :src="topicNavUrl" onerror="this.src='https://rss.com/favicon.ico'"/>
                              <br/>
                              <strong class="mb-2">
                                <span class="text-secondary title">{{ topic.title }}</span>
                              </strong>
                            </div>
                          </div>
                        </a>
                      </center>
                    </Transition>
                  </div>
              </div>
            </div>
        </Transition>
        
        <!-- Error Output Section -->
        <div class="text-danger" v-if="isError && tabNav === 2">
          <p v-if="!data.includes('403')">{{ data }} Try Reloading...</p>
          <div v-else class="row">
            <div class="col-12">
              {{ data.replace(',','') }}
              <img class="err" src="https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/err.png"/>
              <figcaption>Figure 1 - Click <span>Enable Access</span> button below to open this page</figcaption>
              <ul class="text-center text-secondary">
                <li>Click <strong class="text-success">Enable Access</strong> button below</li>
                <li>When new window pops up, click <strong class="text-success">Request temporary access to the demo server</strong> button as per figure above.</li>
                <li>Close that window and back to <span class="text-secondary"><strong>RSS Feed</strong></span> page and start browsing for articles</li>
              </ul>
            </div>
            <div class="col-lg-4"></div>
            <div class="col-lg-4">
              <a @click="backwardNav()" href="https://cors-anywhere.herokuapp.com/corsdemo?accessRequest=01a082fe9409ff8c6c2e76a853281642569c12198c0358fadbbe4a03321d2fd7" class="btn btn-outline-success w-100" target="_blank">
                <i class="bi bi-hdd-rack"></i> 
                Enable Access
              </a>
            </div>
            <div class="col-lg-4"></div>
          </div>
        </div>
      </div>
      <div :class="{'col-3':screenWidth >= 1200, '':screenWidth < 1200}"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sources from '@/assets/sources.js';

const xml2js = require('xml2js');

export default {
  data(){
    return {
      data: '',
      isloading: false,
      isError: false,
      rssSource: '',
      screenWidth: '',
      tabNav: 0,
      topicData:'',
      topicNavUrl: '',
      topicTitle: '',
      topicTitle2:'',
      sources: sources,
    };
  },
  watch: {
    url(){
      this.getRssFeeds();
      this.setScreenWidth();
    },
  },
  mounted() {
    window.addEventListener('resize', this.setScreenWidth);
    this.setScreenWidth();
  },
  unmounted() {
    window.removeEventListener('resize', this.setScreenWidth)
  },
  methods: {
    forwardNav(data){
      if(this.tabNav === 0 && data.topics.length > 1){
        this.topicData = data.topics;
        this.topicNavUrl = data.url;
        this.topicTitle = data.name;
        return this.tabNav < 3 ? this.tabNav++ : this.tabNav;
      }

      if(this.tabNav === 0 && data.topics.length === 1){
        this.pic = data.url;
        this.topicData = data.topics;
        this.topicNavUrl = data.topics[0].url;
        this.topicTitle2 = data.topics[0].title;
        this.getRssFeeds(this.pic,this.topicNavUrl,this.topicTitle2);
        return this.tabNav = 2;
      }
    },
    backwardNav(err){
      if(this.tabNav === 2 && this.topicData.length === 1){
        return this.tabNav = 0;
      }

      if(err){
        this.isError = false;
        console.log('Iserror ',this.isError)
        return this.tabNav = 0;
      }

      return this.tabNav > -1 ? this.tabNav-- : this.tabNav;
    },
    setScreenWidth(){
      console.log(window.innerWidth);
      return this.screenWidth = window.innerWidth;
    },
    async getRssFeeds(picUrl, payloadUrl, title){
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
        return err.message + ',';
      });

      this.feeds = this.data.rss.channel[0].item;
      
      // Custom show elapsed time algorithm
      this.date = () => {
        // get UNIX timestamp of pubDate value
        let Elapsed = new Date(this.feeds[0].pubDate).getTime();

        // get UNIX timestamp of Present value
        let Now = Date.now();

        // Convert UNIX to seconds
        let seconds = ((Now - Elapsed) / 1000);

        // Convert UNIX to minutes
        let minutes = (seconds / 60);

        // Convert UNIX to hours
        let hours = (minutes / 60);

        // Convert UNIX to days
        let days = (hours / 24);

        // Convert UNIX to weeks
        let weeks = (days / 7);

        // Convert UNIX to weeks
        let months = (weeks / 4);

        // Convert UNIX to weeks
        let years = (months / 12);

        // Elapsed Time output logic
        if(seconds >= 1 && seconds < 60){
          return seconds.toFixed(0) + (seconds.toFixed(0) < 2 ? ' second':' seconds');
        }

        if(minutes >= 1 && minutes < 60){
          return minutes.toFixed(0) + (minutes.toFixed(0) < 2 ? ' minute':' minutes');
        }

        if(hours >= 1 && hours < 24){
          return hours.toFixed(0) + (hours.toFixed(0) < 2 ? ' hour':' hours');
        }

        if(days >= 1 && days < 7){
          return days.toFixed(0) + (days.toFixed(0) < 2 ? ' day':' days');
        }

        if(weeks >= 1 && weeks < 4){
          return weeks.toFixed(0) + (weeks.toFixed(0) < 2 ? ' week':' weeks');
        }

        if(months >= 1 && months < 12){
          return months.toFixed(0) + (months.toFixed(0) < 2 ? ' month':' months');
        }

        if(years >= 1){
          return years.toFixed(0) + (years.toFixed(0) < 2 ? ' year':' years');
        }
      };
      this.isloading = false;
    },
  },
}
</script>

<style scoped>
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
    box-shadow: 0px 2px 8px 8px rgb(0 0 0 / 20%)
  }

  .tile {
    min-height: 108px;
  }

  .err {
    width: 100%;
    border: 1px solid #dc3545;
  }

  @media only screen and (max-width: 600px) {
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
    transition: all 0.02s ease-in;
  }

  .card-fade-leave-active {
    transition: all 0.02s ease-out;
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
    transition: all 0.5s ease-in;
    transition-delay: calc(var(--i) * 0.05s);
  }

  .fade-leave-active {
    transition: all 0.5s ease-out;
    transition-delay: calc(var(--i) * 0.05s);
    
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateX(15px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(-15px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateX(10px);
  }

  /* Declared variable --j is used to dynamically calculate transition time */
  .fade-articles-enter-active {
    transition: all 0.5s ease-in;
    transition-delay: calc(var(--j) * 0.05s);
  }

  .fade-articles-leave-active {
    transition: all 0.3s ease-out;
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
    transform: translateX(10px);
  }

  .fade-articles-move, .fade-move, .card-fade-move {
    position: absolute;
  }
</style>