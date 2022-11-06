// Array containing data of multiple sources initiated
const sources = [];

// Dynamic constructor function to add new source into sources object
const NewSource = (Name, sub, Logo, Topics, Topics2, rssUrl) => {
  const topics = [];
  // Dynamic favicon url constructor 
  const favicon = () => sub || `https://${Name.toLowerCase().replaceAll(" ", "").replaceAll(/.com|.org/gi, "")}${Name.includes('.org') ? '.org' : '.com'}/favicon.ico`;
  const [name , url, logo] = [Name, favicon(), Logo]
  if(!Topics2){
    Topics.map(item => {
      const [title, url] = [item[0], item[1]];
      topics.push({title, url});
    })
  } else {
    Topics2.map(item => {
      const [title, url] = [item.replaceAll("-"," "), `${rssUrl[0]}${eval(rssUrl[1])}${rssUrl[2]}`];
      topics.push({title, url});
    })
  }
  return sources.push({name, url, logo, topics})
}

// Constructing and adding new source into sources array by calling the NewSource function by passing relevant params within it
NewSource("Investing.com", null, "in-logo.jpg", [
    ["Economy News", "https://www.investing.com/rss/news_14.rss"],
    ["Economic Indicators News", "https://www.investing.com/rss/news_95.rss"],
    ["Stock Market News", "https://www.investing.com/rss/news_25.rss"],
    ["ETF News", "https://www.investing.com/rss/stock_ETFs.rss"],
    ["Foreign Exchange News", "https://www.investing.com/rss/news_1.rss"],
  ]
);

NewSource("Business Wire", null, "bw-logo.png", [
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

NewSource("GlobeNewswire", null, "gnw.jpg", [
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

NewSource("Finance Asia", null, "fa-logo.jpg", null, ["Markets", "Debt", "Equity", "Debt-Research"], ["https://www.financeasia.com/rss/category/", "item.toLowerCase()", ""]);

NewSource("Trading Economics", null, "te-logo.jfif", null, [ "Consumer Price Index CPI", "GDP Annual Growth Rate", "Core Inflation Rate", "Unemployment Change", 
"Retail Sales MoM", "NonFarm Payrolls Private", "Interest Rate","Weapons Sales"], ["https://tradingeconomics.com/rss/news.aspx?i=", "item.toLowerCase().replaceAll(' ','+')",""]);

NewSource("Seeking Alpha", "https://seekingalpha.com/samw/static/images/favicon-32x32.png", "sa-logo.webp", [
    ["Market Currents", "https://seekingalpha.com/market_currents.xml"],
    ["Editors Picks", "https://seekingalpha.com/tag/editors-picks.xml"],
    ["IPO Analysis", "https://seekingalpha.com/tag/ipo-analysis.xml"],
    ["Transcripts", "https://seekingalpha.com/sector/transcripts.xml"],
    ["Wall St Breakfast", "https://seekingalpha.com/tag/wall-st-breakfast.xml"],
    ["ET-portfolio-strategy", "https://seekingalpha.com/tag/etf-portfolio-strategy.xml"],
  ]
);

NewSource("CSS-Tricks", null, "csst-logo.jpg", [
    ["CSS-Tricks", "https://css-tricks.com/feed/"],
  ]
);

NewSource("freeCodeCamp", "https://cdn.freecodecamp.org/universal/favicons/favicon.ico", "fcc-logo.png", null, [
    "Accessibility", "Algorithms", "Android-App-Development","Angular","Animation","API","Application-Security","ASCII","Assembly-Language","Augmented-Reality","Authentication",
    "Automation","AWS", "Axios", "Azure", "Back-End-Development", "Bash", "Beginner", "Beginners-Guide", "Big-O-Notation", "Binary-Search", "Blazor", "Blockchain", "Blogging", 
    "Bootstrap", "Bots", "Branding", "Business", "C-2", "C-Programming", "Career-Advice", "Career-Change", "Certification", "Charts", "Chrome-Extension", "Closure", 
    "Cloud-Computing", "Coding", "Coding-Challenge",  "Coding-Interview", "Command-Line", "Community", "Compilers", "Computer-Networking", "Computer-Science", "Containers", 
    "CRUD", "Cryptography", "CSharp", "CSS", "CSS-Grid", "Cybersecurity", "D3", "Data-Analysis", "Data-Analytics", "Data-Science", "Data-Structures", "Data-Visualization", 
    "Database", "Debugging", "Deno", "Design", "Developer-Tools", "Devops", "Django", "Docker", "DOM", "Domain-Names", "ECommerce", "Email", "Encryption", "Error", 
    "Error-Handling", "Ethical-Hacking", "Excel", "FastAPI", "Figma", "Firebase", "Flexbox", "Flutter", "Framework", "freeCodeCamp", "Freecodecamp-Curriculum", "Freelancing",
    "Front-End-Development", "Full-Stack", "Functional-Programming", "Git", "Github", "Gitpod", "Go", "Golang", "Google", "Google-Cloud-Platform", "Google-Sheets", "Hacking", 
    "Hacktoberfest", "Hardware", "Heroku", "HTML", "HTML5", "HTTP", "Image-Compression", "Information-Security", "Infrastructure-as-Code", "Interview-Tips", "Interviews", "IOS",
    "Java", "Javascript", "Jenkins", "Job-Hunting", "Julia", "Junior-Developer", "Kotlin", "Kubernetes", "Laravel","Learning-To-Code","Life-Lessons","Linux","Low-Code","MAC",
    "Machine-Learning","Markdown","Math","Microservices", "Microsoft", "NestJS", "Network-Engineering", "Neural-Networks", "Nextjs", "Node", "Node-JS", "NPM", 
    "Object-Oriented-Programming", "Online-Courses", "Open-Source", "OpenGL", "Pair-Programming", "PHP", "Portfolio", "Postgres", "Problem-Solving", "Product-Design", 
    "Productivity", "Programming", "Programming-Languages", "Project-Management", "Projects", "Python", "Pytorch", "Quality-Assurance", "React","React-Context","React-Hooks",
    "React-Router", "ReactJS", "Redis", "Redux", "Regex", "Remote-Work", "Responsive-Design", "Rest-API", "Resume", "Rust", "SASS", "Security", "Self-Improvement", "SEO", 
    "Serverless", "Smart-Contracts", "Software", "Software-Architecture", "Software-Development", "Software-Engineering", "Software-Testing", "Solana", "SQL", "Startup", 
    "Storage", "Svelte", "SVG", "Swift", "Systems", "Systems-Engineering", "Tableau", "Tailwind", "Tech", "Technical-Writing", "Technology", "Tensorflow", "Terraform", 
    "Test-Driven-Development", "Testing", "Typescript", "UI-Design", "Unicode", "University", "Unreal-Engine", "User-Experience", "Vim", "Visual-Basic", "VSCode", "Vue", "Web",
     "Web-Design", "Web-Development", "Web-Performance", "Web-Scraping", "Web-Security", "Web3", "WebGPU", "Windows", "Windows-10", "Wordpress", "XML", "Youtube"
], ["https://www.freecodecamp.org/news/tag/", "item.toLowerCase()", '/rss']);

NewSource("Reuters", null, "reuters-logo.png", [
    ["Market Impact", "https://www.reutersagency.com/feed/?best-customer-impacts=market-impact&post_type=best"],
    ["Energy & Commodities", "https://www.reutersagency.com/feed/?best-sectors=commodities-energy&post_type=best"],
    ["Economy", "https://www.reutersagency.com/feed/?best-sectors=economy&post_type=best"],
    ["Equities", "https://www.reutersagency.com/feed/?best-sectors=equities&post_type=best"],
    ["FX & Fixed Income", "https://www.reutersagency.com/feed/?best-sectors=foreign-exchange-fixed-income&post_type=best"],
  ]
);

NewSource("CNN", null, "cnn-logo.png", [
    ["CNN World", "http://rss.cnn.com/rss/cnn_latest.rss"],
  ]
);

NewSource("CNBC", null, "cnbc-logo.png", [
    ["Investing News", "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=15839069"],
  ]
);

NewSource("Yahoo Finance", null, "yf-logo.jpg", [
    ["Finance News", "https://finance.yahoo.com/news/rssindex"],
  ]
);

NewSource("MarketWatch", null, "mw-logo.png", [
    ["Real-time Headlines", "http://feeds.marketwatch.com/marketwatch/realtimeheadlines"],
  ]
);

NewSource("Zacks", null, "zk-logo.png", [
    ["Press Release", "https://scr.zacks.com/rss/pressrelease.aspx"],
  ]
);

NewSource("S&P Global", "https://www.spglobal.com/_assets/images/icons/SPG_favicon_wht_32x32.ico", "sp-logo.png", [
    ["Corporate News", "https://www.spglobal.com/spdji/en/rss/rss-details/?rssFeedName=corporate-news"],
  ]
);

NewSource("WSJ", null, "wsj-logo.png", [
    ["Markets", "https://feeds.a.dj.com/rss/RSSMarketsMain.xml"],
  ]
);

NewSource("The EurAsian Times", null, "eat-logo.png", [
    ["Latest News", "https://eurasiantimes.com/feed/"],
  ]
);

NewSource("DefenseNews", "https://www.defensenews.com/pf/resources/img/favicons/def/favicon-32x32.png?d=104", "dn-logo.jpg", null, ["Global", "Air", "Land", "Naval", "Space", "Unmanned", "Industry"], ["https://www.defensenews.com/arc/outboundfeeds/rss/category/", "item.toLowerCase()" ,"/?outputType=xml"]);

NewSource("DefenseTalk", "https://feedburner.com/favicon.ico", "dt-logo.jpeg", null, [ "DefenseNews", "Army News", "Defense Security", "Defense Technology", "Missiles Bombs", "WMD News", "NavyNews", "DronesNews"], ["https://feeds.feedburner.com/", "item.toLowerCase().replaceAll(' ','-')",""]);

NewSource("Shephard Media", null, "sm-logo.png", [
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

NewSource("Janes", null, "janes-logo.png", [
    ["Janes News", "https://www.janes.com/feeds/news"],
  ]
);

NewSource("GlobalSecurity.org", null, "gs-logo.png", [
    ["Defence News", "https://www.globalsecurity.org/globalsecurity-org.xml"],
  ]
);

NewSource("The Diplomat", null, "td-logo.png", [
    ["Current Affairs", "https://thediplomat.com/feed/"],
  ]
);

NewSource("Science Daily", null, "scd-logo.jpg", [
    ["All News","https://www.sciencedaily.com/rss/all.xml"],
    ["Top Science","https://www.sciencedaily.com/rss/top/science.xml"],
    ["Top Technology", "https://www.sciencedaily.com/rss/top/technology.xml"],
  ]
);

NewSource("SpaceNews", 'https://spacenews.com/wp-content/themes/spacenews/favicon-32x32.png', "spn-logo.png", [
    ["SpaceNews", "https://spacenews.com/feed/"],
  ]
);

// Exporting the variable to any file
export default sources;
