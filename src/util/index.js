export default class Util {
  // Array containing data of multiple sources initiated
  static sources = [];

  // Dynamic constructor method to add new source into sources object
  static NewSource(Name, sub, Logo, Topics, Topics2, rssUrl) {
    // Initiate topics array
    const topics = [];

    // Dynamic favicon url constructor
    const favicon = () => {
      const Url = Name.includes(".")
        ? `https://${Name.toLowerCase()}/favicon.ico`
        : `https://${Name.toLowerCase().replaceAll(" ", "")}.com/favicon.ico`;
      return sub || Url;
    };

    // Intiating and storing data in variables respectively
    const [name, url, logo] = [Name, favicon(), Logo];

    // If lists of RSS links structure pattern are variable
    if (!Topics2) {
      Topics.map((item) => {
        const [title, url] = [item[0], item[1]];
        topics.push({ title, url });
      });
    } else {
      // If lists of RSS links structure patterns are constant
      Topics2.map((item) => {
        let [title, url] = [
          item.replaceAll("-", " "),
          `${rssUrl[0]}${eval(rssUrl[1]).replaceAll(" ", "-").toLowerCase()}${
            rssUrl[2] ?? ""
          }`,
        ];

        // Logic for to uppercase every first letter in the sentence
        if (title) {
          const arr = title.split(/\/| |-/gi);
          const formattedWords = [];
          arr.map((word) => {
            const First_Letter = word[0].toUpperCase();
            const Other_Letters = word.slice(1).toLowerCase();
            const Full_Word = First_Letter + Other_Letters;
            formattedWords.push(Full_Word);
            title = formattedWords.join(" ");
          });
        }
        // Adding title and urls of respective RSS feeds into topics array
        topics.push({ title, url });
      });
    }
    // Adding all the relevant data into sources array as an object
    return this.sources.push({ name, url, logo, topics });
  }

  // URL Encoder method
  static UrlEncoder(url) {
    return encodeURIComponent(url);
  }

  // Custom show elapsed time algorithm method
  static ElapsedTime(date) {
    // get UNIX timestamp of pubDate value
    const Elapsed = new Date(date).getTime();
    // get UNIX timestamp of Present value
    const Now = Date.now();
    // Convert UNIX to seconds
    const seconds = (Now - Elapsed) / 1000;
    // Convert UNIX to minutes
    const minutes = seconds / 60;
    // Convert UNIX to hours
    const hours = minutes / 60;
    // Convert UNIX to days
    const days = hours / 24;
    // Convert UNIX to weeks
    const weeks = days / 7;
    // Convert UNIX to months
    const months = weeks / 4;
    // Convert UNIX to years
    const years = months / 12;
    // Elapsed Time output logic
    if (seconds >= 1 && seconds < 60) {
      return (
        seconds.toFixed(0) + (seconds.toFixed(0) < 2 ? " second" : " seconds")
      );
    }
    if (minutes >= 1 && minutes < 60) {
      return (
        minutes.toFixed(0) + (minutes.toFixed(0) < 2 ? " minute" : " minutes")
      );
    }
    if (hours >= 1 && hours < 24) {
      return hours.toFixed(0) + (hours.toFixed(0) < 2 ? " hour" : " hours");
    }
    if (days >= 1 && days < 7) {
      return days.toFixed(0) + (days.toFixed(0) < 2 ? " day" : " days");
    }
    if (weeks >= 1 && weeks < 4) {
      return weeks.toFixed(0) + (weeks.toFixed(0) < 2 ? " week" : " weeks");
    }
    if (months >= 1 && months < 12) {
      return months.toFixed(0) + (months.toFixed(0) < 2 ? " month" : " months");
    }
    if (years >= 1) {
      return years.toFixed(0) + (years.toFixed(0) < 2 ? " year" : " years");
    }
    if (Now - Elapsed) {
      return "Sometime";
    }
  }

  // Article Link
  static articleLink(data) {
    const link = data[0];
    if (typeof link === "object") {
      return link["$"].href;
    }
    return link;
  }

  // Article header picture extracting and display logic
  static titlePic(idx, feeds, data) {
    // Refer https://eslint.org/docs/latest/rules/no-prototype-builtins for hasOwnProperty lint errors
    if (Object.keys(data).includes("rss")) {
      if (Object.prototype.hasOwnProperty.call(feeds[idx], "enclosure")) {
        return feeds[idx].enclosure[0].$.url;
      }

      if (Object.prototype.hasOwnProperty.call(feeds[idx], "media:group")) {
        return feeds[idx]["media:group"][0]["media:content"][0].$.url;
      }

      if (Object.prototype.hasOwnProperty.call(feeds[idx], "media:content")) {
        return feeds[idx]["media:content"][0].$.url;
      }

      if (
        Object.prototype.hasOwnProperty.call(feeds[idx], "description") &&
        feeds[idx].description[0].includes("src=")
      ) {
        return feeds[idx].description[0].split('src="')[1].split('"')[0];
      }

      if (
        Object.prototype.hasOwnProperty.call(feeds[idx], "a10:content") &&
        feeds[idx]["a10:content"][0]._.includes("url(&quot;")
      ) {
        return feeds[idx]["a10:content"][0]._.split("&quot;")[1];
      }

      if (feeds[idx].title === "The Diplomat") {
        return false;
      }

      if (
        Object.prototype.hasOwnProperty.call(feeds[idx], "description") &&
        feeds[idx].description[0].includes("src=")
      ) {
        return feeds[idx].content[0];
      }
    }

    if (Object.keys(data).includes("rdf:RDF")) {
      return false;
    }
  }

  // Article description extracting and display logic
  static articleDescription(idx, feeds, data) {
    // Refer https://eslint.org/docs/latest/rules/no-prototype-builtins for hasOwnProperty lint errors
    if (
      Object.keys(data).includes("rss") &&
      Object.prototype.hasOwnProperty.call(feeds[idx], "description")
    ) {
      const isEmptyDesc =
        feeds[idx].description[0].replaceAll("\n", "").replaceAll(" ", "")
          .length === 0 || feeds[idx].description[0].includes("DefenceTalk");
      if (
        Object.prototype.hasOwnProperty.call(feeds[idx], "description") &&
        !isEmptyDesc
      ) {
        if (feeds[idx].description[0].includes("</") && !isEmptyDesc) {
          // Regex to target and replace all html tags with empty space
          return feeds[idx].description[0].replaceAll(/<[^>]*>/gi, "").trim();
        }

        if (feeds[idx].description[0] && !isEmptyDesc) {
          return feeds[idx].description[0].trim();
        }
      }
      return false;
    }
    if (
      Object.keys(data).includes("rdf:RDF") &&
      Object.prototype.hasOwnProperty.call(feeds[idx], "description")
    ) {
      return feeds[idx].description;
    }

    if (
      Object.keys(data).includes("feed") &&
      Object.prototype.hasOwnProperty.call(feeds[idx], "entry")
    ) {
      return feeds[idx].content[0].replaceAll(/<[^>]*>/gi, "").trim();
    }

    if (
      Object.keys(data).includes("feed") &&
      Object.prototype.hasOwnProperty.call(feeds[idx], "summary")
    ) {
      return feeds[idx].summary[0].replaceAll(/<[^>]*>/gi, "").trim();
    }
  }
}
