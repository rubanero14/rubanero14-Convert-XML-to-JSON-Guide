<template>
  <div>
    <h1>RSS Feed</h1>
    <label for=""><input type="radio" value="https://www.financeasia.com/rss/latest" v-model="url"/>Finance Asia</label>
    <br>
    <label for=""><input type="radio" value="https://tradingeconomics.com/rss/" v-model="url"/>Trading Economics</label>
    <br>
    <label for=""><input type="radio" value="https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069" v-model="url"/>CNBC</label>
    <br>
    <button class="btn btn-secondary" @click="getRssFeeds">Load</button>
    <hr class="my-3"/>
    <div>{{ data }}</div>
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
    },
  },
}
</script>

<style scoped>
  
</style>