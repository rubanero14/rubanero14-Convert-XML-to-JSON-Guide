export default class Util {
    static UrlEncoder(url) {
        return encodeURIComponent(url);
    }

    static ElapsedTime(date) {
        // Custom show elapsed time algorithm
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