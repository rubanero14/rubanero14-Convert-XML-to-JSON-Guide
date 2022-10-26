<template>
    <div class="card">
        <slot />
    </div>
</template>
<style scoped>
.card {
    cursor: pointer;
    box-shadow: 0px 1px 4px 0px rgb(0 0 0 / 20%);
    border-radius: 5px;
    overflow: hidden;
}

.card.logo {
    height: 120px;
    width: 120px;
    border-radius: 8px;
}

.card:hover {
    background: rgba(0,0,0,.05);
}

.card.logo:hover {
    box-shadow: 0px 2px 8px 8px rgb(0 0 0 / 20%);
}

@media only screen and (max-width: 600px) {
    .card.logo {
        height: 80px;
        width: 80px;
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
</style>
