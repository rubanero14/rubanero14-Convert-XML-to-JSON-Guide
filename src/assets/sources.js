// Array containing data of multiple sources initiated
const sources = [];

// Constructor function to add new source
function NewSource(Name, Url, Logo, Topics) {
  const topics = []; 
  const name = Name;
  const url = Url;
  const logo = Logo;
  Topics.map(item => {
    const title = item[0];
    const url = item[1];
    topics.push({title, url});
  })
  sources.push({
    name,
    url,
    logo,
    topics,
  })
}

// Favicon url generator
function favicon(title, sub) {
  return (
    sub ||
    `https://${title
      .toLowerCase()
      .replaceAll(" ", "")
      .replaceAll(".com", "")}.com/favicon.ico`
  );
}

// Constructing and adding new source into sources array by calling the NewSource function by passing relevant params within it

NewSource("Investing.com", favicon("Investing.com"), "in-logo.jpg", [
    ["Economy News", "https://www.investing.com/rss/news_14.rss"],
    ["Economic Indicators News", "https://www.investing.com/rss/news_95.rss"],
    ["Stock Market News", "https://www.investing.com/rss/news_25.rss"],
    ["ETF News", "https://www.investing.com/rss/stock_ETFs.rss"],
    ["Foreign Exchange News", "https://www.investing.com/rss/news_1.rss"],
  ]
);

NewSource("Business Wire", favicon("Business Wire"),"bw-logo.png", [
    ["Dividend News","https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeEF9ZVA==&_gl=1*z96yy4*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA4MTU2My4yLjEuMTY2NjA4MjAxOS4wLjAuMA.."],
    ["IPO News","https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeEF9YXQ==&_gl=1*oudbjk*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA4MTU2My4yLjAuMTY2NjA4MTU2My4wLjAuMA.."],
    ["Merger/Acquisition News","https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeEFtRWA==&_gl=1*ewsir6*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQxMi4wLjAuMA.."],
    ["Share Issue News","https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtWXA==&_gl=1*ji7i1m*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQzNC4wLjAuMA.."],
    ["Stock Split News","https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtWXg==&_gl=1*1ysdfcb*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQ0MS4wLjAuMA.."],
    ["Stock Sale/Buyback News","https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtWXw==&_gl=1*11xwt23*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQ0NS4wLjAuMA.."],
    ["SPAC News","https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJaF1hWXw==&_gl=1*9mr1pq*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA3NDIwOS4xLjEuMTY2NjA3NTQ1MS4wLjAuMA.."],
    ["Closed End Fund News","https://feed.businesswire.com/rss/home/?rss=G1QFDERJXkJeGVtYXg==&_gl=1*mau74y*_ga*OTYwNTQzODE4LjE2NjYwNzU0MTM.*_ga_ZQWF70T3FK*MTY2NjA4MTU2My4yLjEuMTY2NjA4MTczMC4wLjAuMA.."],
  ]
);

NewSource("GlobeNewswire", favicon("GlobeNewswire"), "gnw.jpg", [
    ["Dividend Reports", "https://www.globenewswire.com/RssFeed/subjectcode/12-Dividend%20Reports%20and%20Estimates/feedTitle/GlobeNewswire%20-%20Dividend%20Reports%20and%20Estimates"],
    ["Company Announcement", "https://www.globenewswire.com/RssFeed/subjectcode/9-Company%20Announcement/feedTitle/GlobeNewswire%20-%20Company%20Announcement"],
    ["Conference Calls", "https://www.globenewswire.com/RssFeed/subjectcode/89-Conference%20Calls%202f%20Webcasts/feedTitle/GlobeNewswire%20-%20Conference%20Calls,%20Webcasts"],
    ["Initial Public Offerings", "https://www.globenewswire.com/RssFeed/subjectcode/21-Initial%20Public%20Offerings/feedTitle/GlobeNewswire%20-%20Initial%20Public%20Offerings"],
    ["Earnings Releases", "https://www.globenewswire.com/RssFeed/subjectcode/13-Earnings%20Releases%20And%20Operating%20Results/feedTitle/GlobeNewswire%20-%20Earnings%20Releases%20And%20Operating%20Results"],
    ["Directors And Officers", "https://www.globenewswire.com/RssFeed/subjectcode/11-Directors%20And%20Officers/feedTitle/GlobeNewswire%20-%20Directors%20And%20Officers"],
    ["Insider's Buy & Sell", "https://www.globenewswire.com/RssFeed/subjectcode/22-Insider%2027s%20Buy%202fSell/feedTitle/GlobeNewswire%20-%20Insider%20s%20Buy,%20Sell"],
    ["Interim Information", "https://www.globenewswire.com/RssFeed/subjectcode/66-Interim%20Information/feedTitle/GlobeNewswire%20-%20Interim%20Information"],
    ["Funds Information", "https://www.globenewswire.com/RssFeed/subjectcode/80-Investment%20Fund%20Information/feedTitle/GlobeNewswire%20-%20Investment%20Fund%20Information"],
    ["Net Asset Value", "https://www.globenewswire.com/RssFeed/subjectcode/62-Net%20Asset%20Value/feedTitle/GlobeNewswire%20-%20Net%20Asset%20Value"],
    ["Press Releases", "https://www.globenewswire.com/RssFeed/subjectcode/72-Press%20Releases/feedTitle/GlobeNewswire%20-%20Press%20Releases"],
  ]
);

NewSource("Finance Asia", favicon("Finance Asia"), "fa-logo.jpg", [
    ["Markets", "https://www.financeasia.com/rss/category/markets"],
    ["Debt", "https://www.financeasia.com/rss/category/debt"],
    ["Equity", "https://www.financeasia.com/rss/category/equity"],
    ["Debt Research", "https://www.financeasia.com/rss/category/debt-research"],
  ]
);

NewSource("Trading Economics", favicon("Trading Economics"), "te-logo.jfif", [
    ["Consumer Price Index (CPI)", "https://tradingeconomics.com/rss/news.aspx?i=consumer+price+index+cpi"],
    ["GDP Annual Growth Rate", "https://tradingeconomics.com/rss/news.aspx?i=gdp+annual+growth+rate"],
    ["Core Inflation Rate", "https://tradingeconomics.com/rss/news.aspx?i=core+inflation+rate"],
    ["Unemployment Change", "https://tradingeconomics.com/rss/news.aspx?i=unemployment+change"],
    ["Retail Sales (MoM)", "https://tradingeconomics.com/rss/news.aspx?i=retail+sales+mom"],
    ["Non-Farm Payroll (US)", "https://tradingeconomics.com/rss/news.aspx?i=nonfarm+payrolls+private"],
    ["Interest Rate", "https://tradingeconomics.com/rss/news.aspx?i=interest+rate"],
    ["Weapons Sales", "https://tradingeconomics.com/rss/news.aspx?i=weapons+sales"],
  ]
);

NewSource("Seeking Alpha", favicon(null, "https://seekingalpha.com/samw/static/images/favicon-32x32.png"), "sa-logo.webp", [
    ["Breaking News", "https://seekingalpha.com/market_currents.xml"],
    ["Editor's Picks", "https://seekingalpha.com/tag/editors-picks.xml"],
    ["IPO Analysis", "https://seekingalpha.com/tag/ipo-analysis.xml"],
    ["Transcripts", "https://seekingalpha.com/sector/transcripts.xml"],
    ["Wall Street Breakfast", "https://seekingalpha.com/tag/wall-st-breakfast.xml"],
    ["ETFs & Portfolio Strategy", "https://seekingalpha.com/tag/etf-portfolio-strategy.xml"],
  ]
);

NewSource("CSS-Tricks", favicon("CSS-Tricks"), "csst-logo.jpg", [
    ["CSS-Tricks", "https://css-tricks.com/feed/"],
  ]
);

NewSource("Reuters", favicon("Reuters"), "reuters-logo.png", [
    ["Market Impact", "https://www.reutersagency.com/feed/?best-customer-impacts=market-impact&post_type=best"],
    ["Energy & Commodities", "https://www.reutersagency.com/feed/?best-sectors=commodities-energy&post_type=best"],
    ["Economy", "https://www.reutersagency.com/feed/?best-sectors=economy&post_type=best"],
    ["Equities", "https://www.reutersagency.com/feed/?best-sectors=equities&post_type=best"],
    ["FX & Fixed Income", "https://www.reutersagency.com/feed/?best-sectors=foreign-exchange-fixed-income&post_type=best"],
  ]
);

NewSource("CNN", favicon("CNN"), "cnn-logo.png", [
    ["CNN World", "http://rss.cnn.com/rss/cnn_latest.rss"],
  ]
);

NewSource("CNBC", favicon("CNBC"), "cnbc-logo.png", [
    ["Investing News", "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069"],
  ]
);

NewSource("Yahoo Finance", favicon("Yahoo Finance"), "yf-logo.jpg", [
    ["Finance News", "https://finance.yahoo.com/news/rssindex"],
  ]
);

NewSource("MarketWatch", favicon("MarketWatch"), "mw-logo.png", [
    ["Real-time Headlines", "http://feeds.marketwatch.com/marketwatch/realtimeheadlines"],
  ]
);

NewSource("Zacks", favicon("Zacks"), "zk-logo.png", [
    ["Press Release", "https://scr.zacks.com/rss/pressrelease.aspx"],
  ]
);

NewSource("S&P Global", favicon(null, "https://www.spglobal.com/_assets/images/icons/SPG_favicon_wht_32x32.ico"), "sp-logo.png", [
    ["Corporate News", "https://www.spglobal.com/spdji/en/rss/rss-details/?rssFeedName=corporate-news"],
  ]
);

NewSource("WSJ", favicon("WSJ"), "wsj-logo.png", [
    ["Markets", "https://feeds.a.dj.com/rss/RSSMarketsMain.xml"],
  ]
);

NewSource("The EurAsian Times", favicon("EurAsian Times"), "eat-logo.png", [
    ["Feeds", "https://eurasiantimes.com/feed/"],
  ]
);

NewSource("DefenseNews", favicon(null, "https://www.defensenews.com/pf/resources/img/favicons/def/favicon-32x32.png?d=104"), "dn-logo.jpg", [
    ["Home Page", "https://www.defensenews.com/arc/outboundfeeds/rss/category/global/?outputType=xml"],
    ["Global", "https://www.defensenews.com/arc/outboundfeeds/rss/category/global/?outputType=xml"],
    ["Air", "https://www.defensenews.com/arc/outboundfeeds/rss/category/air/?outputType=xml"],
    ["Land", "https://www.defensenews.com/arc/outboundfeeds/rss/category/land/?outputType=xml"],
    ["Naval", "https://www.defensenews.com/arc/outboundfeeds/rss/category/naval/?outputType=xml"],
    ["Space", "https://www.defensenews.com/arc/outboundfeeds/rss/category/space/?outputType=xml"],
    ["Unmanned", "https://www.defensenews.com/arc/outboundfeeds/rss/category/unmanned/?outputType=xml"],
    ["Industry", "https://www.defensenews.com/arc/outboundfeeds/rss/category/industry/?outputType=xml"],
  ]
);

NewSource("DefenseTalk", favicon('DefenseTalk'), "dt-logo.jpeg", [
    ["Defense", "https://feeds2.feedburner.com/defensenews"],
    ["Army", "https://feeds2.feedburner.com/army-news"],
    ["Defense & Security", "https://feeds2.feedburner.com/defense-security"],
    ["Defense Technology", "https://feeds2.feedburner.com/defense-technology"],
    ["Missiles & Bombs", "https://feeds2.feedburner.com/missiles-bombs"],
    ["Nuclear & WMD", "https://feeds2.feedburner.com/wmd-news"],
    ["Navy", "https://feeds2.feedburner.com/navynews"],
    ["Drones", "https://feeds.feedburner.com/dronesnews"],
  ]
);

NewSource("Shephard Media", favicon("Shephard Media"), "sm-logo.png", [
    ["Latest Articles", "https://www.shephardmedia.com/news/feed/"],
    ["Naval Warfare", "https://www.shephardmedia.com/news/naval-warfare/feed/"],
    ["Land Warfare", "https://www.shephardmedia.com/news/landwarfareintl/feed/"],
    ["Air Warfare", "https://www.shephardmedia.com/news/air-warfare/feed/"],
    ["Defence Notes", "https://www.shephardmedia.com/news/defence-notes/feed/"],
    ["Defence Helicopter", "https://www.shephardmedia.com/news/defence-helicopter/feed/"],
    ["Military Logistics", "https://www.shephardmedia.com/news/mil-log/feed/"],
    ["Special Operations", "https://www.shephardmedia.com/news/special-operations/feed/"],
    ["Uncrewed Vehicles", "https://www.shephardmedia.com/news/uv-online/feed/"],
  ]
);

NewSource("Janes", favicon('Janes'), "janes-logo.png", [
    ["Janes News", "https://www.janes.com/feeds/news"],
  ]
);

NewSource("GlobalSecurity.org", favicon(null, "https://www.globalsecurity.org/favicon.ico"), "gs-logo.png", [
    ["Defence News", "https://www.globalsecurity.org/globalsecurity-org.xml"],
  ]
);

NewSource("The Diplomat", favicon("The Diplomat"), "td-logo.png", [
    ["Current Affairs", "https://thediplomat.com/feed/"],
  ]
);

NewSource("Science Daily", favicon("Science Daily"), "scd-logo.jpg", [
    ["All News","https://www.sciencedaily.com/rss/all.xml"],
    ["Top Science","https://www.sciencedaily.com/rss/top/science.xml"],
    ["Top Technology", "https://www.sciencedaily.com/rss/top/technology.xml"],
  ]
);

NewSource("SpaceNews", favicon(null, 'https://spacenews.com/wp-content/themes/spacenews/favicon-32x32.png'), "spn-logo.png", [
    ["SpaceNews", "https://spacenews.com/feed/"],
  ]
);

// Exporting the variable to any file
export default sources;
