<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>RSS Feed</h1>
      </div>
      <div class="col-12 text-center">
        <div class="d-flex justify-content-center align-items-center">
            <div class="col-md-4 d-flex">
                <select class="form-select" v-model="url" name="feeds">
                  <option disabled value="">Select Feed Sources:</option>
                  <option value="https://www.financeasia.com/rss/latest">Finance Asia</option>
                  <option value="https://tradingeconomics.com/rss/">Trading Economics</option>
                  <option value="https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069">CNBC</option>
                  <option value="https://finance.yahoo.com/news/rssindex">Yahoo Finance</option>
                </select>
                <button class="btn btn-secondary" @click="getRssFeeds">Load</button>
            </div>
        </div>
      </div>
      <hr class="my-3"/>
      <div class="col-12">
        <div>{{ feed }}</div>
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
      url: 'https://www.investing.com/rss/market_overview_Fundamental.rss',
      pic: '',
      feed: '',
    };
  },
  computed: {
    loadRSS(){
      return this.getRssFeeds();
    }
  },
  methods: {
    async getRssFeeds(){
      let payload = () => {
        if (this.url === 'https://tradingeconomics.com/rss/'){
          return this.url;
        }
        return `http://preprod-secureplatformtech.com:9090/${this.url}`;
      }

      this.data = await axios
      .get(payload())
      .then((response) => {
        console.log(payload())
        return xml2js.parseStringPromise(response.data);
      });
      this.feed = this.data.rss.channel[0].item;
      console.log(this.data)
    },
  },
}
</script>

<style scoped>
  
</style>