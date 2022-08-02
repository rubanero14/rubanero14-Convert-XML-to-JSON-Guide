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
              <button v-if="tabNav > 0" @click="backwardNav()" class="btn btn-secondary w-100" :disabled="isloading"><i class="bi bi-arrow-left"></i> Back</button>
            </div>
            <div class="col-lg-4"></div>
        </div>
        <hr class="my-3" size="5" noshade/>
      </div>
      <div class="d-flex justify-content-center">
        <div v-if="isloading" class="text-center spinner-border text-secondary" role="status">
        </div>
      </div>
      <div class="col-12 text-center">
        <div class="row">
          <div v-for="source in sources" :key="source.id" class="col-4">
            <Transition name="fade" appear>
              <center v-if="tabNav === 0">
                <a class="title" @click="forwardNav(source)">
                  <div class="card logo p-0 mb-3">
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
      <div class="col-12">
        <h2 v-if="tabNav === 1" class="text-secondary mb-3">{{ topicTitle }}</h2>
        <div class="row">
            <div v-for="topic in topicData" :key="topic.title" class="col-4">
              <Transition name="fade" appear>
                <center v-if="tabNav === 1">
                  <a class="title" @click="getRssFeeds(topicNavUrl,topic.url,topic.title) && forwardNav()">
                    <div class="card tile mb-3">
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
      <div class="col-12">
        <div v-if="!isError">
          <h2 v-if="!isloading && tabNav === 2" class="text-secondary mb-3">{{ topicTitle2 }}</h2>
          <div class="mb-2" :key="feed.link" v-for="feed in feeds">
            <Transition name="fade" appear>
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
        <div class="text-danger" v-else>
          <p v-if="!data.includes('403')">{{ data }} Try Reloading...</p>
          <div v-else class="row">
            <div class="col-lg-4"></div>
            <div class="col-lg-4">
              <img class="err" src="https://rubanero14.github.io/RSS-Feed-CP-Prototype/err.png"/>
              <figcaption>Figure 1 - Click <span>Enable Access</span> button below to open this page</figcaption>
              <ul class="text-start text-secondary">
                <li>Click <span class="text-success">Enable Access</span> button below</li>
                <li>When new window pops up, click <span class="text-success">Request temporary access to the demo server</span> button as per figure above.</li>
                <li>Close that window and back to <span class="text-secondary"><strong>RSS Feed</strong></span> page and start browsing for articles</li>
              </ul>
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
          logo: 'https://yt3.ggpht.com/ytc/AKedOLS_nSIZMnr1HRa6-Mv4LzRBX5DzaOnO0hbei8cdQw=s900-c-k-c0x00ffffff-no-rj',
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
          logo: 'https://www.quinlanandassociates.com/wp-content/uploads/2018/05/FinanceAsia_logo.jpg',
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
          logo: 'https://media-exp2.licdn.com/dms/image/C4D0BAQG_hy6E3ejXJg/company-logo_200_200/0/1519952139707?e=2147483647&v=beta&t=g9oQV22y2zbTkilrraI2Af4FgOUNLe2YjkdWUw55VUM',
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
          logo: 'https://seekingalpha.com/samw/static/images/OrganizationLogo.7f745bcc.png',
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
          logo: 'https://bankimooncentre.org/wp-content/uploads/2020/06/cnn-logo-square-300x300.png',
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
          logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052016/untitled-1_240.png?itok=JFho4q51',
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
          logo: 'https://daxsenmedia.com/wp-content/uploads/2021/05/yahoo-finance-article-300x300.jpg',
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
          logo: 'https://brandlogos.net/wp-content/uploads/2016/07/marketwatch-logo-vector-download.png',
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
          logo: 'data:image/png;base64,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',
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
          logo: 'https://brandlogos.net/wp-content/uploads/2021/04/nasdaq-logo-300x300.png',
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
    backwardNav(){
      if(this.tabNav === 2 && this.topicData.length === 1){
        return this.tabNav = 0;
      }
      if(this.isError){
        this.isError = false
        return this.tabNav = 0;
      }
      return this.tabNav > -1 ? this.tabNav-- : this.tabNav;
    },
    setScreenWidth(){
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
    font-size: 35px;
  }

  h2 {
    font-size: 25px;
    font-weight: bold;
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
    height: 250px;
    width: 250px;
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

  @media only screen and (max-width: 992px) {
    .card.logo {
      height: 200px;
      width: 200px;
      border-radius: 8px;
    }
  }

  @media only screen and (max-width: 800px) {
    .card.logo {
      height: 150px;
      width: 150px;
      border-radius: 8px;
    }
  }

  @media only screen and (max-width: 600px) {
    span.title {
      font-size: 12px;
    }
    .card.logo {
      height: 150px;
      width: 150px;
      border-radius: 8px;
    }
  }

  @media only screen and (max-width: 500px) {
    .card.logo {
      height: 100px;
      width: 100px;
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
    transition: all 0.5s ease;
    transition-delay: 0.3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(100px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateX(-100px);
  }
</style>