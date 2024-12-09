<script setup lang="ts">
defineProps<{
    airbnb: AirBnb,
}>();
</script>

<template>
    <li class="flex flex-col">
        <img :src="`img/${airbnb.img}`" :alt="airbnb.name" class="object-cover ">
        <div>
            <h2 class="font-bold">{{ airbnb.name }}, {{ airbnb.city }}</h2>
            <p><span class="font-bold">{{ airbnb.price_per_night.adult }}kr SEK</span>/natt</p>
        </div>
    </li>
</template>