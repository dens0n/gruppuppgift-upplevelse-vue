<script setup lang="ts">
import { useHotelStore } from '@/stores/hotel';
import { ref, watch, watchEffect } from 'vue';

const props = defineProps<{
    name: string
}>();

const hotel = ref<Hotel>({} as Hotel)
const store = useHotelStore();

watchEffect(async () => {
    hotel.value = await store.getHotel(props.name);
})

const bookingData = {
    nights: 3,
    guests: 2,
    dateFrom: "2022-10-01",
    dateTo: "2022-10-04",
    airBnbId: 1,
    service: 1720.60
}

// const airBnbData = {
//     id: 1,
//     title: "Cozy apartment in the heart of the city",
//     price: 100,
//     rating: 4.5,
//     reviews: 100,
//     location: "New York, USA",
//     images: [
//         "https://via.placeholder.com/150",
//         "https://via.placeholder.com/150",
//         "https://via.placeholder.com/150",
//         "https://via.placeholder.com/150",
//     ]
// }

</script>

<!-- TODO: booking data -->
<!-- TODO: price formating -->

<template>
    <main class="flex flex-col items-center mt-40">
        <div class="flex gap-4">
            <!-- your trip -->
            <div class="space-y-4 w-72">
                <h1 class="font-bold">Your trip</h1>
                <div>
                    <p class="font-bold">Dates</p>
                    <p>Feb 3 – 8, 2025</p>
                </div>
                <div>
                    <p class="font-bold">Guests</p>
                    <p>{{bookingData.guests}} guests</p>
                </div>
            </div>
            <!-- Price details -->
            <div class="p-6 border rounded-xl">
                <div class="flex gap-2">
                    <img :src="`/img/${hotel.img}`" :alt="hotel.name" class="w-36">
                    <div>
                        <p>{{ hotel.name }}</p>
                        <p>Premium home with quiet location close to Sälen</p>
                    </div>
                </div>
                <!-- divider -->
                <div class="my-4 border-b"></div>
                <h1 class="font-bold">Price details</h1>
                <div class="flex justify-between">
                    <p>{{ hotel.price_per_night.adult }} kr SEK x {{ bookingData.nights }} nights</p>
                    <p>{{hotel.price_per_night.adult * bookingData.nights}} kr SEK</p>
                </div>
                <div class="flex justify-between">
                    <p>Airbnb service</p>
                    <p>{{bookingData.service}} kr SEK</p>
                </div>
                <!-- divider -->
                <div class="my-4 border-b"></div>
                <div class="flex justify-between">
                    <h1>Total</h1>
                    <h1 class="font-bold">{{ hotel.price_per_night.adult * bookingData.nights + bookingData.service }} kr SEK</h1>
                </div>
            </div>
        </div>
    </main>
</template>