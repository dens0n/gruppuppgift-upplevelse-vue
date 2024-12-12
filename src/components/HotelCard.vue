<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
defineProps<{
    hotel: Hotel,
}>();

const route = useRoute();
const router = useRouter();

const bookHotel = (name: string) => {
    const params = {
        name: name,
        ...route.params
    }
    router.push({
        name: "hotel",
        params: params,
    })
}
</script>

<template>
    <li class="flex relative bg-slate-200 border rounded-md text-lg">
        <img :src="`/img/${hotel.img}`" :alt="hotel.name" class="object-cover size-64 rounded-md">
        <div class="flex w-full justify-between">
            <h2 class="font-bold">{{ hotel.name }}, {{ hotel.city }}</h2>
            <p><span class="font-bold">{{ hotel.price_per_night.adult }}kr SEK</span>/natt</p>
        </div>
        <button @click="bookHotel(hotel.name)" class="absolute right-2 bottom-1 bg-blue-500 border rounded-md px-4">
            Boka
        </button>
    </li>
</template>