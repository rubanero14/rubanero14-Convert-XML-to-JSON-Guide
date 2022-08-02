<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-secondary mb-3"><strong>RSS Feed</strong></h1>
      </div>
      <div class="col-12 text-center">
        <div class="row">
            <div class="col-lg-4"></div>
            <div class="col-lg-4 d-block d-lg-flex" v-if="tabNav === 0">
              <a href="https://github.com/rubanero14/rubanero14-Convert-XML-to-JSON-Guide/blob/master/src/components/RSSFeed.vue" class="btn btn-outline-secondary mb-lg-3 w-100" target="_blank"><i class="bi bi-code-slash"></i> Source Code</a>
            </div>
            <div class="col-lg-4 d-block d-lg-flex" v-else>
              <button v-if="tabNav > 0" @click="backwardNav(isError)" class="btn btn-secondary w-100" :disabled="isloading"><i class="bi bi-arrow-left"></i> Back</button>
            </div>
            <div class="col-lg-4"></div>
        </div>
        <hr class="my-3" size="5" noshade/>
      </div>
      <div class="col-12 text-center" v-if="isloading">
        <div class="text-center spinner-border text-secondary" role="status">
        </div>
      </div>
      <div class="col-12 text-center">
        <Transition name="fade" appear mode="out-in">
          <h2 v-if="tabNav === 0" class="text-secondary mb-3">Sources</h2>
        </Transition>
        <div :class="{'':screenWidth < 1200, 'row':screenWidth >= 1200}">
          <div :class="{'col-2':screenWidth >= 1200, '':screenWidth < 1200}"></div>
          <div :class="{'':screenWidth < 1200, 'col-8':screenWidth >= 1200}">
            <div v-show="tabNav === 0">
              <div v-for="source in sources" :key="source.id" class="d-inline-block">
                <Transition name="fade" appear mode="out-in">
                  <center v-if="tabNav === 0">
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
            <div v-if="!isError && !isloading">
              <Transition name="fade" appear mode="out-in">
                <h2 v-if="!isloading && tabNav === 2" class="text-secondary mb-3">{{ topicTitle2 }}</h2>
              </Transition>
              <div class="mb-2" :key="feed.link" v-for="feed in feeds">
                <Transition name="fade" appear mode="out-in">
                  <center v-if="!isloading && tabNav === 2">
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
          </div>
          <div :class="{'col-2':screenWidth >= 1200, '':screenWidth < 1200}"></div>
          </div>
          <Transition name="fade" appear mode="out-in">
            <h2 v-if="tabNav === 1" class="text-secondary mb-3">{{ topicTitle }}</h2>
          </Transition>
          <div v-show="tabNav === 1">
              <div v-for="topic in topicData" :key="topic.title" class="d-inline-block">
                <Transition name="fade" appear mode="out-in">
                  <center v-if="tabNav === 1">
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
          <div class="text-danger" v-if="isError && !isloading && tabNav === 2">
            <p v-if="!data.includes('403')">{{ data }} Try Reloading...</p>
            <div v-else class="row">
              <div class="col-12">
                <img class="err" src="https://rubanero14.github.io/RSS-Feed-CP-Prototype/err.png"/>
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
      isloading: false,
      isError: false,
      rssSource: '',
      screenWidth: '',
      tabNav: 0,
      topicData:'',
      topicNavUrl: '',
      topicTitle: '',
      topicTitle2:'',
      sources: [
        {
          name: 'Investing.com',
          url: 'https://www.investing.com/favicon.ico',
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/in-logo.jpg',
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
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/fa-logo.jpg',
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
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/te-logo.jfif',
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
          name: "Seeking Alpha",
          url: 'https://seekingalpha.com/samw/static/images/favicon-32x32.png',
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/sa-logo.webp',
          topics: [
            {
              title: 'Breaking News',
              url: 'https://seekingalpha.com/market_currents.xml'
            },
            {
              title: "Editor's Picks",
              url: 'https://seekingalpha.com/tag/editors-picks.xml'
            },
            {
              title: "IPO Analysis",
              url: 'https://seekingalpha.com/tag/ipo-analysis.xml'
            },
            {
              title: "Transcripts",
              url: 'https://seekingalpha.com/sector/transcripts.xml'
            },
            {
              title: "Wall Street Breakfast",
              url: 'https://seekingalpha.com/tag/wall-st-breakfast.xml'
            },
            {
              title: "ETFs & Portfolio Strategy",
              url: 'https://seekingalpha.com/tag/etf-portfolio-strategy.xml'
            }
          ]
        },
        {
          name: "CNN",
          url: 'https://edition.cnn.com/favicon.ico',
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/cnn-logo.png',
          topics: [
            {
              title: "CNN World",
              url: 'http://rss.cnn.com/rss/cnn_latest.rss'
            },
          ]
        },
        {
          name: 'CNBC',
          url: 'https://www.cnbc.com/favicon.ico',
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/cnbc-logo.png',
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
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/yf-logo.jpg',
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
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/mw-logo.png',
          topics: [
            {
              title: "Real-time Headlines",
              url: "http://feeds.marketwatch.com/marketwatch/realtimeheadlines",
            },
          ],
        },
        {
          name: 'S&P Global',
          url: 'https://www.spglobal.com/_assets/images/icons/SPG_favicon_wht_32x32.ico',
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/sp-logo.png',
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
          logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype/nq-logo.png',
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
    window.addEventListener('resize', this.setScreenWidth);
    this.setScreenWidth();
  },
  unmounted() {
    window.removeEventListener('resize', this.setScreenWidth)
  },
  methods: {
    forwardNav(data){
      console.log('Iserror ',this.isError)
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
      console.log('Iserror ',err)
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
        console.log(weeks);
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
    border-radius: 16px;
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
  
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-500px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateX(10px);
  }
</style>