<script setup lang="ts">
import { useHotelStore } from '@/stores/hotel';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const hotel = ref<Hotel>({} as Hotel)
const store = useHotelStore();
const route = useRoute();
const name = route.params.name as string;

watchEffect(async () => {
    try {
        if (store.hotels.length < 0) {
            await store.getHotels();
            return;
        }
        hotel.value = await store.getHotel(name)
    } catch (error) {
        console.error(error)
    }
})

</script>

<template>
    <div v-if="!store.loading && hotel.price_per_night">
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