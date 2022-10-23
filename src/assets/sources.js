function favicon(title, sub) {
  return (
    sub ||
    `https://${title
      .toLowerCase()
      .replaceAll(" ", "")
      .replaceAll(".com", "")}.com/favicon.ico`
  );
}

const sources = [
  {
    name: "Investing.com",
    url: favicon("Investing.com"),
    logo: "in-logo.jpg",
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
    name: "Business Wire",
    url: favicon("Business Wire"),
    logo: "bw-logo.png",
    topics: [
      {
        title: "Dividend News",
        url: "https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeEF9ZVA==&_gl=1*z96yy4*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA4MTU2My4yLjEuMTY2NjA4MjAxOS4wLjAuMA..",
      },
      {
        title: "IPO News",
        url: "https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeEF9YXQ==&_gl=1*oudbjk*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA4MTU2My4yLjAuMTY2NjA4MTU2My4wLjAuMA..",
      },
      {
        title: "Merger/Acquisition News",
        url: "https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeEFtRWA==&_gl=1*ewsir6*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQxMi4wLjAuMA..",
      },
      {
        title: "Share Issue News",
        url: "https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtWXA==&_gl=1*ji7i1m*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQzNC4wLjAuMA..",
      },
      {
        title: "Stock Split News",
        url: "https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtWXg==&_gl=1*1ysdfcb*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQ0MS4wLjAuMA..",
      },
      {
        title: "Stock Sale/Buyback News",
        url: "https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtWXw==&_gl=1*11xwt23*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQ0NS4wLjAuMA..",
      },
      {
        title: "SPAC News",
        url: "https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJaF1hWXw==&_gl=1*9mr1pq*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQ1MS4wLjAuMA..",
      },
      {
        title: "Closed End Fund News",
        url: "https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtYXg==&_gl=1*mau74y*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA4MTU2My4yLjEuMTY2NjA4MTczMC4wLjAuMA..",
      },
    ],
  },
  {
    name: "GlobeNewswire",
    url: favicon("GlobeNewswire"),
    logo: "gnw.jpg",
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
    name: "Finance Asia",
    url: favicon("Finance Asia"),
    logo: "fa-logo.jpg",
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
    ],
  },
  {
    name: "Trading Economics",
    url: favicon("Trading Economics"),
    logo: "te-logo.jfif",
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
    url: favicon(
      null,
      "https://seekingalpha.com/samw/static/images/favicon-32x32.png"
    ),
    logo: "sa-logo.webp",
    topics: [
      {
        title: "Breaking News",
        url: "https://seekingalpha.com/market_currents.xml",
      },
      {
        title: "Editor's Picks",
        url: "https://seekingalpha.com/tag/editors-picks.xml",
      },
      {
        title: "IPO Analysis",
        url: "https://seekingalpha.com/tag/ipo-analysis.xml",
      },
      {
        title: "Transcripts",
        url: "https://seekingalpha.com/sector/transcripts.xml",
      },
      {
        title: "Wall Street Breakfast",
        url: "https://seekingalpha.com/tag/wall-st-breakfast.xml",
      },
      {
        title: "ETFs & Portfolio Strategy",
        url: "https://seekingalpha.com/tag/etf-portfolio-strategy.xml",
      },
    ],
  },
  {
    name: "Nasdaq",
    url: favicon("Nasdaq"),
    logo: "nq-logo.png",
    topics: [
      {
        title: "All News Releases",
        url: "https://ir.nasdaq.com/rss/news-releases.xml?items=15",
      },
      {
        title: "Financial Releases",
        url: "https://ir.nasdaq.com/rss/news-releases.xml?items=15&category=Financial",
      },
      {
        title: "All SEC Filings",
        url: "https://ir.nasdaq.com/rss/sec-filings.xml?items=15",
      },
      {
        title: "Form 4 SEC Filings",
        url: "https://ir.nasdaq.com/rss/sec-filings.xml?items=15&sub_group=4",
      },
    ],
  },
  {
    name: "Reuters",
    url: favicon("Reuters"),
    logo: "reuters-logo.png",
    topics: [
      {
        title: "Market Impact",
        url: "https://www.reutersagency.com/feed/?best-customer-impacts=market-impact&post_type=best",
      },
      {
        title: "Energy & Commodities",
        url: "https://www.reutersagency.com/feed/?best-sectors=commodities-energy&post_type=best",
      },
      {
        title: "Economy",
        url: "https://www.reutersagency.com/feed/?best-sectors=economy&post_type=best",
      },
      {
        title: "Equities",
        url: "https://www.reutersagency.com/feed/?best-sectors=equities&post_type=best",
      },
      {
        title: "FX & Fixed Income",
        url: "https://www.reutersagency.com/feed/?best-sectors=foreign-exchange-fixed-income&post_type=best",
      },
    ],
  },
  {
    name: "CNN",
    url: favicon("CNN"),
    logo: "cnn-logo.png",
    topics: [
      {
        title: "CNN World",
        url: "http://rss.cnn.com/rss/cnn_latest.rss",
      },
    ],
  },
  {
    name: "CNBC",
    url: favicon("CNBC"),
    logo: "cnbc-logo.png",
    topics: [
      {
        title: "Investing News",
        url: "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069",
      },
    ],
  },
  {
    name: "Yahoo Finance",
    url: favicon("Yahoo Finance"),
    logo: "yf-logo.jpg",
    topics: [
      {
        title: "Finance News",
        url: "https://finance.yahoo.com/news/rssindex",
      },
    ],
  },
  {
    name: "MarketWatch",
    url: favicon("MarketWatch"),
    logo: "mw-logo.png",
    topics: [
      {
        title: "Real-time Headlines",
        url: "http://feeds.marketwatch.com/marketwatch/realtimeheadlines",
      },
    ],
  },
  {
    name: "S&P Global",
    url: favicon(
      null,
      "https://www.spglobal.com/_assets/images/icons/SPG_favicon_wht_32x32.ico"
    ),
    logo: "sp-logo.png",
    topics: [
      {
        title: "Corporate News",
        url: "https://www.spglobal.com/spdji/en/rss/rss-details/?rssFeedName=corporate-news",
      },
    ],
  },
  {
    name: "WSJ",
    url: favicon("WSJ"),
    logo: "wsj-logo.png",
    topics: [
      {
        title: "Markets",
        url: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
      },
    ],
  },
  {
    name: "DefenseNews",
    url: favicon(
      null,
      "https://www.defensenews.com/pf/resources/img/favicons/def/favicon-32x32.png?d=104"
    ),
    logo: "dn-logo.jpg",
    topics: [
      {
        title: "Home Page",
        url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/global/?outputType=xml",
      },
      {
        title: "Global",
        url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/global/?outputType=xml",
      },
      {
        title: "Air",
        url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/air/?outputType=xml",
      },
      {
        title: "Land",
        url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/land/?outputType=xml",
      },
      {
        title: "Naval",
        url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/naval/?outputType=xml",
      },
      {
        title: "Space",
        url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/space/?outputType=xml",
      },
      {
        title: "Unmanned",
        url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/unmanned/?outputType=xml",
      },
      {
        title: "Industry",
        url: "https://www.defensenews.com/arc/outboundfeeds/rss/category/industry/?outputType=xml",
      },
    ],
  },
  {
    name: "DefenseTalk",
    url: favicon('feedburner'),
    logo: "df-logo.jpeg",
    topics: [
      {
        title: "Defense",
        url: "https://feeds2.feedburner.com/defensenews",
      },
      {
        title: "Army",
        url: "https://feeds2.feedburner.com/army-news",
      },
      {
        title: "Defense & Security",
        url: "https://feeds2.feedburner.com/defense-security",
      },
      {
        title: "Defense Technology",
        url: "https://feeds2.feedburner.com/defense-technology",
      },
      {
        title: "Missiles & Bombs",
        url: "https://feeds2.feedburner.com/missiles-bombs",
      },
      {
        title: "Nuclear & WMD",
        url: "https://feeds2.feedburner.com/wmd-news",
      },
      {
        title: "Navy",
        url: "https://feeds2.feedburner.com/navynews",
      },
      {
        title: "Drones ",
        url: "https://feeds.feedburner.com/dronesnews",
      },
    ],
  },
  {
    name: "Shephard Media",
    url: favicon("Shephard Media"),
    logo: "sm-logo.png",
    topics: [
      {
        title: "Latest Articles",
        url: "https://www.shephardmedia.com/news/feed/",
      },
      {
        title: "Naval Warfare",
        url: "https://www.shephardmedia.com/news/naval-warfare/feed/",
      },
      {
        title: "Land Warfare",
        url: "https://www.shephardmedia.com/news/landwarfareintl/feed/",
      },
      {
        title: "Air Warfare",
        url: "https://www.shephardmedia.com/news/air-warfare/feed/",
      },
      {
        title: "Defence Notes",
        url: "https://www.shephardmedia.com/news/defence-notes/feed/",
      },
      {
        title: "Defence Helicopter",
        url: "https://www.shephardmedia.com/news/defence-helicopter/feed/",
      },
      {
        title: "Military Logistics",
        url: "https://www.shephardmedia.com/news/mil-log/feed/",
      },
      {
        title: "Special Operations",
        url: "https://www.shephardmedia.com/news/special-operations/feed/",
      },
      {
        title: "Uncrewed Vehicles",
        url: "https://www.shephardmedia.com/news/uv-online/feed/",
      },
    ],
  },
  {
    name: "Janes",
    url: favicon('Janes'),
    logo: "janes-logo.png",
    topics: [
      {
        title: "Janes News",
        url: "https://www.janes.com/feeds/news",
      },
    ],
  },
  {
    name: "GlobalSecurity.org",
    url: favicon(null, "https://www.globalsecurity.org/favicon.ico"),
    logo: "gs-logo.png",
    topics: [
      {
        title: "Defence News",
        url: "https://www.globalsecurity.org/globalsecurity-org.xml",
      },
    ],
  },
  {
    name: "The Diplomat",
    url: favicon("The Diplomat"),
    logo: "td-logo.png",
    topics: [
      {
        title: "Current Affairs",
        url: "https://thediplomat.com/feed/",
      },
    ],
  },
  {
    name: "Science Daily",
    url: favicon("Science Daily"),
    logo: "scd-logo.jpg",
    topics: [
      {
        title: "All News",
        url: "https://www.sciencedaily.com/rss/all.xml",
      },
      {
        title: "Top Science",
        url: "https://www.sciencedaily.com/rss/top/science.xml",
      },
      {
        title: "Top Technology",
        url: "https://www.sciencedaily.com/rss/top/technology.xml",
      },
    ],
  },
  {
    name: "SpaceNews",
    url: favicon(null, 'https://spacenews.com/wp-content/themes/spacenews/favicon-32x32.png'),
    logo: "spn-logo.png",
    topics: [
      {
        title: "SpaceNews",
        url: "https://spacenews.com/feed/",
      },
    ],
  },
];

export default sources;
