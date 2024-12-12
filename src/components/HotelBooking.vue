<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const hotel = ref<Hotel>({} as Hotel)
const route = useRoute();
const loading = ref<boolean>(false)
const name = route.params.name as string;

watchEffect(async () => {
    try {
        loading.value = true;

        const response = await fetch('/hotels.json');
        const data: Hotel[] = await response.json();

        const hotelValue: Hotel = data.find((hotel) => hotel.name.includes(name)) as Hotel

        if (!hotelValue) throw new Error("Hotel not found");

        loading.value = false;
        hotel.value = hotelValue;
    } catch (error) {
        console.error(error)
    }
})

</script>

<template>
    <div v-if="!loading">
        <div class="container flex flex-col mx-auto gap-2">
            <img :src="`/img/${hotel.img}`" :alt="hotel.name" class="object-cover size-64 rounded-md">
            <h2 class="font-bold">{{ hotel.name }}, {{ hotel.city }}</h2>
            <p>{{ hotel.beds }}</p>
            <p>Antal gäster</p>
            <p>Antal sovrum</p>
            <p>Antal badrum</p>
            <p>Antal</p>
            <p><span class="font-bold">{{ hotel.price_per_night.adult }}kr SEK</span>/natt</p>
            <div class="mr-auto">
                <p>Sammanlagda priset</p>
                <p>Pris per person</p>
                <p>Incheckning och utcheckning</p>
                <p>Paketerbjudande</p>
                <p>ingen fruktost och höghastighetsinternet</p>
                <p>fruktost och höghastighetsinternet</p>
                <p>fruktost och höghastighetsinternet och städservice</p>

            </div>
        </div>
    </div>
</template>
<!-- 
"name": "Grand Plaza",
"city": "Stockholm",
"price_per_night": {
    "adult": 1200,
    "child": 800
},
"beds": 2,
"img": "GrandPlaza.jpg" 
        "essential_info": [
            "Hel villa",
            "Rymmer 4",
            "1 sovrum",
            "1 badrum",
            "7 sängar"
        ],
-->