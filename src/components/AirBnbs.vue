<script setup lang="ts">
import { watch } from 'vue';
import AirBnbCard from './AirBnbCard.vue';
import { useAirbnbStore } from '@/stores/airbnb';

const store = useAirbnbStore();

watch(store.airbnbs, async () => {
    await store.getAirBnbs()
    console.log(store.airbnbs)
}, { immediate: true })
</script>


<template>
    <ul v-if="store.airbnbs" class="flex flex-col p-2 gap-2 ">
        <AirBnbCard v-for="airbnb in store.airbnbs" :key="airbnb.name" :airbnb="airbnb" />
    </ul>
</template>
