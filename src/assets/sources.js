const sources = [
    {
      name: 'Investing.com',
      url: 'https://www.investing.com/favicon.ico',
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/in-logo.jpg',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/fa-logo.jpg',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/te-logo.jfif',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/sa-logo.webp',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/cnn-logo.png',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/cnbc-logo.png',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/yf-logo.jpg',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/mw-logo.png',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/sp-logo.png',
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
      logo: 'https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/nq-logo.png',
      topics: [
        {
          title: "Nasdaq Original Feed",
          url: "https://www.nasdaq.com/feed/nasdaq-original/rss.xml",
        },
      ],
    }
  ]

export default sources;