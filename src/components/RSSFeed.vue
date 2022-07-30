<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-secondary mb-3"><strong>RSS Feed</strong></h1>
      </div>
      <div class="col-12 text-center" v-if="tabNav > 0">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <button @click="backwardNav()" class="btn btn-secondary w-100">Back</button>
            </div>
            <div class="col-md-4"></div>
        </div>
      </div>
      <div class="col-12 text-center">
        <div class="d-inline-block justify-content-center align-items-center">
          <div class="row" v-if="tabNav === 0">
            <div v-for="source in sources" :key="source.id" class="col-4 mb-3">
              <a class="title" @click="forwardNav(source,source.url)">
                <div class="card">
                  <img :src="source.url" onerror="this.src='https://rss.com/favicon.ico'"/>
                  <strong class="mb-3">
                    <span class="text-secondary title">{{ source.name }}</span>
                  </strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12" v-if="tabNav === 1">
        <div class="row">
            <div v-for="topic in topicData" :key="topic.title" class="col-4 mb-3">
              <a class="title" @click="getRssFeeds(topicNavUrl,topic.url) && forwardNav()">
                <div class="card">
                  <img :src="topicNavUrl" onerror="this.src='https://rss.com/favicon.ico'"/>
                  <strong class="mb-3">
                    <span class="text-secondary title">{{ topic.title }}</span>
                  </strong>
                </div>
              </a>
            </div>
          </div>
      </div>
      <div class="col-12">
        <div v-if="isloading" class="spinner-border text-secondary" role="status">
        </div>
        <div v-else-if="tabNav === 2">
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
            {{ data }} Try Reloading...
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
      isloading: false,
      isError: false,
      rssSource: '',
      screenWidth: '',
      tabNav: 0,
      topicData:'',
      topicNavUrl: '',
      sources: [
        {
          name: 'Investing.com',
          url: 'https://www.investing.com/favicon.ico',
          topics: [
            {
              title: "Economy News",
              url: "https://www.investing.com/rss/news_14.rss",
            },
            {
              title: "Stock Market News",
              url: "https://www.investing.com/rss/news_25.rss",
            },
            {
              title: "ETF News",
              url: "https://www.investing.com/rss/stock_ETFs.rss",
            },
            {
              title: "Foreign Exchange News",
              url: "https://www.investing.com/rss/news_1.rss",
            },
          ],
        },
        {
          name: 'Finance Asia',
          url: 'https://www.financeasia.com/favicon.ico',
          topics: [
            {
              title: "Markets",
              url: "https://www.financeasia.com/rss/category/markets",
            },
            {
              title: "Debt",
              url: "https://www.financeasia.com/rss/category/debt",
            },
            {
              title: "Equity",
              url: "https://www.financeasia.com/rss/category/equity",
            },
            {
              title: "Debt Research",
              url: "https://www.financeasia.com/rss/category/debt-research",
            },
          ]
        },
        {
          name: 'Trading Economics',
          url: 'https://tradingeconomics.com/favicon.ico',
          topics: [
            {
              title: "Consumer Price Index (CPI)",
              url: "https://tradingeconomics.com/rss/news.aspx?i=consumer+price+index+cpi",
            },
            {
              title: "Core Inflation Rate",
              url: "https://tradingeconomics.com/rss/news.aspx?i=core+inflation+rate",
            },
            {
              title: "Unemployment Change",
              url: "https://tradingeconomics.com/rss/news.aspx?i=unemployment+change",
            },
            {
              title: "Retail Sales (MoM)",
              url: "https://tradingeconomics.com/rss/news.aspx?i=retail+sales+mom",
            },
            {
              title: "Non-Farm Payroll (US)",
              url: "https://tradingeconomics.com/rss/news.aspx?i=nonfarm+payrolls+private",
            },
            {
              title: "Interest Rate",
              url: "https://tradingeconomics.com/rss/news.aspx?i=interest+rate",
            },
            {
              title: "Weapons Sales",
              url: "https://tradingeconomics.com/rss/news.aspx?i=weapons+sales",
            },
          ],
        },
        {
          name: 'CNBC',
          url: 'https://www.cnbc.com/favicon.ico',
          topics: [
            {
              title: "Investing News",
              url: "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069",
            },
          ],
        },
        {
          name: 'Yahoo Finance',
          url: 'https://finance.yahoo.com/favicon.ico',
          topics: [
            {
              title: "Finance News",
              url: "https://finance.yahoo.com/news/rssindex",
            },
          ],
        },
        {
          name: 'MarketWatch',
          url: 'https://www.marketwatch.com/favicon.ico',
          topics: [
            {
              title: "Real-time Headlines",
              url: "http://feeds.marketwatch.com/marketwatch/realtimeheadlines",
            },
          ],
        },
        {
          name: 'SP Global',
          url: 'https://www.spglobal.com/_assets/images/icons/SPG_favicon_wht_32x32.ico',
          topics: [
            {
              title: "Corporate News",
              url: "https://www.spglobal.com/spdji/en/rss/rss-details/?rssFeedName=corporate-news",
            },
          ],
        },
        {
          name: 'Nasdaq',
          url: 'https://www.nasdaq.com/favicon.ico',
          topics: [
            {
              title: "Nasdaq Original Feed",
              url: "https://www.nasdaq.com/feed/nasdaq-original/rss.xml",
            },
          ],
        }
      ],
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
    forwardNav(data, url){
      if(this.tabNav === 0){
        this.topicData = data.topics;
        this.topicNavUrl = url;
      }
      return this.tabNav < 3 ? this.tabNav++ : this.tabNav;
    },
    backwardNav(){
      return this.tabNav > -1 ? this.tabNav-- : this.tabNav;
    },
    setScreenWidth(){
      return this.screenWidth = window.innerWidth;
    },
    async getRssFeeds(picUrl, payloadUrl){
      this.isError = false;
      this.isloading = true;
      this.pic = picUrl;

      // Payload for Fetch API setting
      let payload = `https://cors-anywhere.herokuapp.com/${payloadUrl}`;
      
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
  h1 {
    font-size: 35px;
  }

  .right {
    border-radius: 0px 4px 4px 0px;
  }

  ul {
    list-style: none;
  }

  img {
    margin: 20px auto 10px auto;
    width: 70px;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,.125);
    padding: 5px;
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

  @media only screen and (max-width: 600px) {
  span.title {
    font-size: 12px;
  }
}
</style>