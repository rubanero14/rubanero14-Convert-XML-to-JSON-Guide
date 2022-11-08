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
    transition: all 0.2s ease-out;
}

.card.logo {
    height: 120px;
    width: 120px;
    border-radius: 8px;
}

.card:hover {
    transform: scale(0.90);
}

.card.logo:hover {
    transform: scale(0.85);
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
