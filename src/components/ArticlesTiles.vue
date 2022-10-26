<template>
    <Transition
        :key="index"
        appear
        name="fade-articles"
        mode="out-in"
        >
        <!-- Using the declared index and assign it to dynamic variable for CSS transition use -->
        <center :style="{ '--j':index }">
            <a class="title" :href="feed.link.toString()" target="_blank">
                <card-component>
                    <div class="p-3">
                        <div class="row">
                            <div class="col-9 col-md-11 text-start">
                                <h3 class="title text-secondary">
                                    <span v-if="screenWidth >= 1200">{{ feed.title.toString().substr(0, 250).replace(': ','') + '...' }}</span>
                                    <span v-else-if="screenWidth >= 600 && screenWidth < 1200">{{ feed.title.toString().substr(0, 150).replace(': ','') + '...' }}</span>
                                    <span v-else>{{ feed.title.toString().substr(0, 50).replace(': ','') + '...' }}</span>
                                </h3>
                                <p v-if="date()" class="time d-block text-secondary mb-0"><em>Updated: {{ date(index) }} ago</em></p>
                            </div>
                            <div class="wrapper col-3 col-md-1 d-flex align-items-center justify-content-center">
                                <img class="m-auto" v-if="pic" :src="pic" onerror="this.src='https://rss.com/favicon.ico'"/>
                            </div>
                        </div>
                    </div>
                </card-component>
            </a>
        </center>
    </Transition>
</template>
<script>
import CardComponent from './UI/CardComponent.vue';
export default {
    props: ['index', 'feed', 'data', 'feeds', 'screenWidth', 'pic'],
    components: { CardComponent },
    methods: {
        date(){
            this.rssMode = Object.keys(this.data).includes("rss") ? "pubDate" : "dc:date";
            // Custom show elapsed time algorithm
            // get UNIX timestamp of pubDate value
            const Elapsed = new Date(this.feeds[0][this.rssMode]).getTime();
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
}
</script>