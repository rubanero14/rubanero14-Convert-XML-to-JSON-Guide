const sources = [
    {
      name: 'Investing.com',
      url: 'https://www.investing.com/favicon.ico',
      logo: 'in-logo.jpg',
      topics: [
        {
          title: "Economy News",
          url: "https://www.investing.com/rss/news_14.rss",
        },
        {
          title: "Economic Indicators News",
          url: "https://www.investing.com/rss/news_95.rss",
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
      name: 'GlobeNewswire',
      url: 'https://www.globenewswire.com/favicon.ico',
      logo: 'gnw.jpg',
      topics: [
        {
          title: "Dividend Reports",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/12-Dividend%20Reports%20and%20Estimates/feedTitle/GlobeNewswire%20-%20Dividend%20Reports%20and%20Estimates",
        },
        {
          title: "Company Announcement",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/9-Company%20Announcement/feedTitle/GlobeNewswire%20-%20Company%20Announcement",
        },
        {
          title: "Conference Calls",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/89-Conference%20Calls%202f%20Webcasts/feedTitle/GlobeNewswire%20-%20Conference%20Calls,%20Webcasts",
        },
        {
          title: "Initial Public Offerings",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/21-Initial%20Public%20Offerings/feedTitle/GlobeNewswire%20-%20Initial%20Public%20Offerings",
        },
        {
          title: "Earnings Releases",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/13-Earnings%20Releases%20And%20Operating%20Results/feedTitle/GlobeNewswire%20-%20Earnings%20Releases%20And%20Operating%20Results",
        },
        {
          title: "Directors And Officers",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/11-Directors%20And%20Officers/feedTitle/GlobeNewswire%20-%20Directors%20And%20Officers",
        },
        {
          title: "Insider's Buy & Sell",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/22-Insider%2027s%20Buy%202fSell/feedTitle/GlobeNewswire%20-%20Insider%20s%20Buy,%20Sell",
        },
        {
          title: "Interim Information",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/66-Interim%20Information/feedTitle/GlobeNewswire%20-%20Interim%20Information",
        },
        {
          title: "Funds Information",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/80-Investment%20Fund%20Information/feedTitle/GlobeNewswire%20-%20Investment%20Fund%20Information",
        },
        {
          title: "Net Asset Value",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/62-Net%20Asset%20Value/feedTitle/GlobeNewswire%20-%20Net%20Asset%20Value",
        },
        {
          title: "Press Releases",
          url: "https://www.globenewswire.com/RssFeed/subjectcode/72-Press%20Releases/feedTitle/GlobeNewswire%20-%20Press%20Releases",
        },
      ],
    },
    {
      name: 'Finance Asia',
      url: 'https://www.financeasia.com/favicon.ico',
      logo: 'fa-logo.jpg',
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
      logo: 'te-logo.jfif',
      topics: [
        {
          title: "Consumer Price Index (CPI)",
          url: "https://tradingeconomics.com/rss/news.aspx?i=consumer+price+index+cpi",
        },
        {
          title: "GDP Annual Growth Rate",
          url: "https://tradingeconomics.com/rss/news.aspx?i=gdp+annual+growth+rate",
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
      logo: 'sa-logo.webp',
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
      logo: 'cnn-logo.png',
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
      logo: 'cnbc-logo.png',
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
      logo: 'yf-logo.jpg',
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
      logo: 'mw-logo.png',
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
      logo: 'sp-logo.png',
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
      logo: 'nq-logo.png',
      topics: [
        {
          title: "Nasdaq Original Feed",
          url: "https://www.nasdaq.com/feed/nasdaq-original/rss.xml",
        },
      ],
    }
  ]

export default sources;