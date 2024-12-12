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

</script>

<template>
    <div v-if="hotel">
        <img :src="`/img/${hotel.img}`" :alt="hotel.name" class="object-cover size-64 rounded-md">
        <div class="flex w-full justify-between">
            <h2 class="font-bold">{{ hotel.name }}, {{ hotel.city }}</h2>
            <p><span class="font-bold">{{ hotel.price_per_night.adult }}kr SEK</span>/natt</p>
        </div>
    </div>
</template>