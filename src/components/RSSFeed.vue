<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>RSS Feed</h1>
      </div>
      <div class="col-12 text-center">
        <div class="d-flex justify-content-center align-items-center">
            <div class="col-md-4 d-flex">
              <div class="input-group">
                <select class="form-select" v-model="url" name="feeds" required>
                    <option disabled value="">Select Feed Sources:</option>
                    <option selected value="https://www.investing.com/rss/market_overview_Fundamental.rss">Investing.com</option>
                    <option value="https://www.financeasia.com/rss/latest">Finance Asia</option>
                    <!-- <option value="https://tradingeconomics.com/rss/">Trading Economics</option> -->
                    <option value="https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069">CNBC</option>
                    <option value="https://finance.yahoo.com/news/rssindex">Yahoo Finance</option>
                    <option value="http://feeds.marketwatch.com/marketwatch/realtimeheadlines/">MarketWatch</option>
                    <!-- <option value="https://www.nasdaq.com/feed/rssoutbound?category=Markets">Nasdaq</option> -->
                  </select>
                  <div class="input-group-append">
                      <button class="btn btn-secondary right" @click="getRssFeeds">{{isError ? 'Reload' : 'Load'}}</button>
                  </div>
              </div>
            </div>
        </div>
      </div>
      <hr class="my-3"/>
      <div class="col-12">
        <div v-if="isloading" class="spinner-border text-secondary" role="status">
        </div>
        <div v-else>
          <div v-if="!isError">
            <div class="mb-2" :key="feed.link" v-for="feed in feeds">
              <div class="card">
                <div class="p-3">
                  <div class="row">
                    <div class="col-9 col-md-11 text-start">
                      <h3 class="title text-secondary">{{ feed.title.toString() }}</h3>
                      <a class="btn btn-secondary link" :href="feed.link.toString()">Read More</a>
                    </div>
                    <div class="col-3 col-md-1 d-flex align-items-center justify-content-center">
                      <img v-if="pic" :src="pic"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-danger" v-else>
            {{ data }}, Try Reloading...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const xml2js = require('xml2js');

export default {
  data(){
    return {
      data: '',
      url: '',
      pic: '',
      feeds: '',
      isloading: false,
      isError: false,
    };
  },
  computed: {
    loadRSS(){
      return this.getRssFeeds();
    }
  },
  methods: {
    async getRssFeeds(){
      this.isError = false;
      this.isloading = true;
      this.pic = this.url.replace("search","www").replace("feeds","www").split('.com')[0]+`.com/favicon.ico`;
      console.log(this.pic);

      let payload = () => {
        return `https://cors-anywhere.herokuapp.com/${this.url}`;
      }
      
      this.data = await axios
      .get(payload())
      .then((response) => {
        console.log(payload())
        return xml2js.parseStringPromise(response.data);
      })
      .catch(err => {
        this.isloading = false;
        this.isError = true;
        return err.message;
      });

      this.feeds = this.data.rss.channel[0].item;
      console.log(this.data);
      this.isloading = false;
    },
  },
}
</script>

<style scoped>
  .right {
    border-radius: 0px 4px 4px 0px;
  }
  ul {
    list-style: none;
  }

  img {
    margin: 20px auto;
    width: 50px;
    border-radius: 4px;
  }

  h3.title{
    font-size: 30px;
    margin-bottom: 15px;
  }

@media only screen and (max-width: 600px) {
  h3.title{
    font-size: 15px;
  }
}
</style>