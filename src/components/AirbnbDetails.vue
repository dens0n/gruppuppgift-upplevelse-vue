<script setup lang="ts">
import { useAirbnbStore } from '@/stores/airbnb';
import { ref, watch, watchEffect } from 'vue';

const props = defineProps<{
    name: string
}>();

const airbnb = ref<AirBnb>({} as AirBnb)
const store = useAirbnbStore();

watchEffect(async () => {
    airbnb.value = await store.getAirBnb(props.name);
})

</script>

<template>
    <div v-if="airbnb">
        <img :src="`/img/${airbnb.img}`" :alt="airbnb.name" class="object-cover size-64 rounded-md">
        <div class="flex w-full justify-between">
            <h2 class="font-bold">{{ airbnb.name }}, {{ airbnb.city }}</h2>
            <p><span class="font-bold">{{ airbnb.price_per_night.adult }}kr SEK</span>/natt</p>
        </div>
    </div>
</template>