<script setup lang="ts">
import { watch } from 'vue';
import HotelCard from './HotelCard.vue';
import { useHotelStore } from '@/stores/hotel';

const store = useHotelStore();

watch(store.hotels, async () => {
    await store.getHotels()
    console.log(store.hotels)
}, { immediate: true })
</script>


<template>
    <ul v-if="store.hotels" class="flex flex-col p-2 gap-2 ">
        <HotelCard v-for="hotel in store.hotels" :key="hotel.name" :hotel="hotel" />
    </ul>
</template>
