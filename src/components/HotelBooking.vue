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
        <div class="container mx-auto">
            <img :src="`/img/${hotel.img}`" :alt="hotel.name" class="object-cover size-64 rounded-md">
            <div class="flex w-full justify-between">
                <h2 class="font-bold">{{ hotel.name }}, {{ hotel.city }}</h2>
                <p><span class="font-bold">{{ hotel.price_per_night.adult }}kr SEK</span>/natt</p>
            </div>
            <div class="mr-auto">
                <p>Sammanlagda priset</p>
                <p>Pris per person</p>
                <p>Incheckning och utcheckning</p>
                <p>Paketerbjudande</p>
            </div>
        </div>
    </div>
</template>