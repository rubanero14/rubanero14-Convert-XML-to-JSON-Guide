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
                <select @change="getRssFeeds" class="form-select" v-model="url" name="feeds" required>
                    <option disabled value="">Select Feed Sources:</option>
                    <option selected value="https://www.investing.com/rss/market_overview_Fundamental.rss">Investing.com</option>
                    <option value="https://www.financeasia.com/rss/latest">Finance Asia</option>
                    <option value="https://tradingeconomics.com/rss/news.aspx">Trading Economics</option>
                    <option value="https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069">CNBC</option>
                    <option value="https://finance.yahoo.com/news/rssindex">Yahoo Finance</option>
                    <option value="http://feeds.marketwatch.com/marketwatch/realtimeheadlines/">MarketWatch</option>
                    <option value="https://www.spglobal.com/spdji/en/rss/rss-details/?rssFeedName=corporate-news">S&P Dow Jones Indices</option>
                    <option value="https://www.nasdaq.com/feed/nasdaq-original/rss.xml">Nasdaq</option>
                  </select>
                  <div v-if="isButton" class="input-group-append">
                      <button class="btn btn-secondary right" @click="getRssFeeds"><i class="bi bi-arrow-clockwise"></i></button>
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
                      <a class="title" :href="feed.link.toString()">
                        <h3 class="title text-secondary">{{ feed.title.toString() }}</h3>
                      </a>
                      <span v-if="date()" class="d-block text-secondary mb-3"><em>Posted: {{ date() }} ago</em></span>
                      <a class="btn btn-secondary link" :href="feed.link.toString()">Read More</a>
                    </div>
                    <div class="wrapper col-3 col-md-1 d-flex align-items-center justify-content-center">
                      <img v-if="pic" :src="pic" onerror="this.src='https://rss.com/favicon.ico'"/>
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
      date: '',
      isloading: false,
      isError: false,
      isButton: false,
    };
  },
  methods: {
    async getRssFeeds(){
      this.isError = false;
      this.isButton = false;
      this.isloading = true;
      this.pic = this.url.replace("search","www").replace("feeds","www").split('.com')[0]+`.com/favicon.ico`;
      // console.log(this.pic);

      // Payload for Fetch API setting
      let payload = `https://cors-anywhere.herokuapp.com/${this.url}`;
      
      // Fetch API as XML and convert into JSON format
      this.data = await axios
      .get(payload)
      .then((response) => {
        console.log(payload)
        return xml2js.parseStringPromise(response.data);
      })
      .catch(err => {
        this.isloading = false;
        this.isError = true;
        this.isButton = true;
        return err.message;
      });

      this.feeds = this.data.rss.channel[0].item;

      // console.log(Date.now() - new Date(this.feeds[0].pubDate).getTime());
      
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
        
        // Elapsed Time output logic
        if(seconds > 0 && seconds < 61){
          return seconds.toFixed(0) + (seconds.toFixed(0) === 1 ? ' second':' seconds');
        }

        if(minutes > 1 && minutes < 61){
          return minutes.toFixed(0) + (minutes.toFixed(0) === 1 ? ' minute':' minutes');
        }

        if(hours > 1 && hours < 25){
          return hours.toFixed(0) + (hours.toFixed(0) === 1 ? ' hour':' hours');
        }

        if(days > 1 && days < 8){
          return days.toFixed(0) + (days.toFixed(0) === 1 ? ' day':' days');
        }

        if(weeks > 1 && weeks < 5){
          return weeks.toFixed(0) + (weeks.toFixed(0) === 1 ? ' week':' weeks');
        }
      };
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
    width: 70px;
    border-radius: 4px;
  }

  h3.title{
    font-size: 30px;
    margin-bottom: 15px;
  }

  a.title {
    text-decoration: none;
    color: inherit;
  }

  .wrapper {
    padding: 0 20px 0 0;
  }

@media only screen and (max-width: 600px) {
  h3.title{
    font-size: 15px;
  }
}
</style>