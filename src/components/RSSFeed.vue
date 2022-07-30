<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>RSS Feed</h1>
      </div>
      <div class="col-12 text-center">
        <div class="d-inline-block justify-content-center align-items-center">
          <div class="row">
            <div class="col-12">
              <div class="input-group">
                <select class="form-select mb-2" v-model="rssSource" name="feeds" required>
                    <option disabled value="">Select Feed Sources:</option>
                    <option selected value="1">Investing.com</option>
                    <option value="2">Finance Asia</option>
                    <option value="3">Trading Economics</option>
                    <option value="4">CNBC</option>
                    <option value="5">Yahoo Finance</option>
                    <option value="6">MarketWatch</option>
                    <option value="7">S&P Dow Jones Indices</option>
                    <option value="8">Nasdaq</option>
                  </select>
                  <div v-if="isButton" class="input-group-append">
                      <button class="btn btn-secondary right" @click="getRssFeeds"><i class="bi bi-arrow-clockwise"></i></button>
                  </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
                <select v-if="+rssSource === 1" class="form-select" v-model="url" name="investing" required>
                  <option disabled selected value="">Select Topic:</option>
                  <option selected value="https://www.investing.com/rss/news_14.rss">Economy News</option>
                  <option value="https://www.investing.com/rss/news_25.rss">Stock Market News</option>
                  <option value="https://www.investing.com/rss/stock_ETFs.rss">ETF News</option>
                  <option value="https://www.investing.com/rss/news_1.rss">Foreign Exchange News</option>
                </select>
                <select v-if="+rssSource === 2" class="form-select" v-model="url" name="financeasia" required>
                  <option disabled selected value="">Select Topic:</option>
                  <option value="https://www.financeasia.com/rss/category/markets">FinanceAsia - Markets</option>
                  <option value="https://www.financeasia.com/rss/category/debt">FinanceAsia - Debt</option>
                  <option value="https://www.financeasia.com/rss/category/equity">FinanceAsia - Equity</option>
                  <option value="https://www.financeasia.com/rss/category/debt-research">FinanceAsia - Debt Research</option>
                </select>
                <select v-if="+rssSource === 3" class="form-select" v-model="url" name="tradingeconomics" required>
                  <option disabled selected value="">Select Topic:</option>
                  <option value="https://tradingeconomics.com/rss/news.aspx?i=consumer+price+index+cpi">Consumer Price Index (CPI)</option>
                  <option value="https://tradingeconomics.com/rss/news.aspx?i=core+inflation+rate">Core Inflation Rate</option>
                  <option value="https://tradingeconomics.com/rss/news.aspx?i=unemployment+change">Unemployment Change</option>
                  <option value="https://tradingeconomics.com/rss/news.aspx?i=retail+sales+mom">Retail Sales (MoM)</option>
                  <option value="https://tradingeconomics.com/rss/news.aspx?i=nonfarm+payrolls+private">Non-Farm Payroll (US)</option>
                  <option value="https://tradingeconomics.com/rss/news.aspx?i=interest+rate">Interest Rate</option>
                  <option value="https://tradingeconomics.com/rss/news.aspx?i=weapons+sales">Weapons Sales</option>
                </select>
                <select v-if="+rssSource === 4" class="form-select" v-model="url" name="cnbc" required>
                  <option disabled selected value="">Select Topic:</option>
                  <option selected value="https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069">Investing News</option>
                </select>
                <select v-if="+rssSource === 5" class="form-select" v-model="url" name="yahoofinance" required>
                  <option disabled selected value="">Select Topic:</option>
                  <option value="https://finance.yahoo.com/news/rssindex">Finance News</option>
                </select>
                <select v-if="+rssSource === 6" class="form-select" v-model="url" name="marketwatch" required>
                  <option disabled selected value="">Select Topic:</option>
                  <option value="http://feeds.marketwatch.com/marketwatch/realtimeheadlines/">Real-time Headlines</option>
                </select>
                <select v-if="+rssSource === 7" class="form-select" v-model="url" name="feeds" required>
                  <option disabled selected value="">Select Topic:</option>
                  <option value="https://www.spglobal.com/spdji/en/rss/rss-details/?rssFeedName=corporate-news">Corporate News</option>
                </select>
                <select v-if="+rssSource === 8" class="form-select" v-model="url" name="feeds" required>
                  <option disabled selected value="">Select Topic:</option>
                  <option value="https://www.nasdaq.com/feed/nasdaq-original/rss.xml">Nasdaq Original Feed</option>
                </select>
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
                        <span v-if="date()" class="time d-block text-secondary"><em>Updated: {{ date() }} ago</em></span>
                      </div>
                      <div class="wrapper col-3 col-md-1 d-flex align-items-center justify-content-center">
                        <img v-if="pic" :src="pic" onerror="this.src='https://rss.com/favicon.ico'"/>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
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
      rssSource: '',
      screenWidth: '',
    };
  },
  watch: {
    url(){
      this.getRssFeeds();
      this.setScreenWidth();
    },
  },
  mounted() {
    window.addEventListener('resize', this.setScreenWidth)
  },
  unmounted() {
    window.removeEventListener('resize', this.setScreenWidth)
  },
  methods: {
    setScreenWidth(){
      this.screenWidth = window.innerWidth;
      return console.log(this.screenWidth);
    },
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

        // Convert UNIX to weeks
        let months = (weeks / 4);

        // Convert UNIX to weeks
        let years = (months / 12);
        
        // Elapsed Time output logic
        if(seconds > 0 && seconds < 60){
          return seconds.toFixed(0) + (seconds.toFixed(0) < 2 ? ' second':' seconds');
        }

        if(minutes > 1 && minutes < 60){
          return minutes.toFixed(0) + (minutes.toFixed(0) < 2 ? ' minute':' minutes');
        }

        if(hours > 1 && hours < 24){
          return hours.toFixed(0) + (hours.toFixed(0) < 2 ? ' hour':' hours');
        }

        if(days > 1 && days < 7){
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
    font-size: 18px;
    font-weight:bold;
    margin-bottom: 15px;
  }

  a.title {
    text-decoration: none;
    color: inherit;
  }

  .wrapper {
    padding: 0 20px 0 0;
  }

  span.time {
    position: absolute;
    bottom: 15px;
    left: 15px;
  }
</style>