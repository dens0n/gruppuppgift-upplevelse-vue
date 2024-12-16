<script setup lang="ts">
import { watch } from "vue"
import HotelCard from "./HotelCard.vue"
import { useHotelStore } from "@/stores/hotel"

const store = useHotelStore()

watch(
    store.hotels,
    async () => {
        await store.getHotels()
        console.log(store.hotels)
    },
    { immediate: true },
)
</script>

<template>
    <main
        class="min-h-screen bg-slate-100"
    >
        <div class="container mx-auto pt-20">
            <ul v-if="store.hotels" class="flex flex-col gap-4">
                <HotelCard
                    v-for="hotel in store.hotels"
                    :key="hotel.name"
                    :hotel="hotel"
                />
            </ul>
        </div>
    </main>
</template>
