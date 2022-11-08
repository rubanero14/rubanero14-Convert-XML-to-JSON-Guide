export default class Util {
    // Array containing data of multiple sources initiated
    static sources = [];

    // Dynamic constructor method to add new source into sources object
    static NewSource(Name, sub, Logo, Topics, Topics2, rssUrl){
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
        return this.sources.push({name, url, logo, topics})
    }

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
        const seconds = ((Now - Elapsed) / 1000);
        // Convert UNIX to minutes
        const minutes = (seconds / 60);
        // Convert UNIX to hours
        const hours = (minutes / 60);
        // Convert UNIX to days
        const days = (hours / 24);
        // Convert UNIX to weeks
        const weeks = (days / 7);
        // Convert UNIX to months
        const months = (weeks / 4);
        // Convert UNIX to years
        const years = (months / 12);
        // Elapsed Time output logic
        if (seconds >= 1 && seconds < 60) {
            return seconds.toFixed(0) + (seconds.toFixed(0) < 2 ? " second" : " seconds");
        }
        if (minutes >= 1 && minutes < 60) {
            return minutes.toFixed(0) + (minutes.toFixed(0) < 2 ? " minute" : " minutes");
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
    }
}
