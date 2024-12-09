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
    <ul v-if="store.airbnbs" class="mx-auto max-w-screen-md">
        <AirBnbCard v-for="airbnb in store.airbnbs" :key="airbnb.name" :airbnb="airbnb" />
    </ul>
</template>

<style scoped>
ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 10px;
}
</style>