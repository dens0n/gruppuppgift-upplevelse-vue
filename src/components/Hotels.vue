<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue"
import HotelCard from "./HotelCard.vue"
import { useHotelStore } from "@/stores/hotel"
import { useRoute } from "vue-router"

const store = useHotelStore()
const route = useRoute()

// Hämta parametrarna från URL
const location = ref<string>(route.params.location as string)
const fromDate = ref(route.params.from)
const toDate = ref(route.params.to)
const adults = ref(Number(route.params.adults) || 0)
const children = ref(Number(route.params.children) || 0)

console.log(
    location.value,
    fromDate.value,
    toDate.value,
    adults.value,
    children.value,
)

// Hämta hotell från store och filtrera baserat på location
const filteredHotels = computed(() => {
    return store.hotels.filter((hotel) => {
        return hotel.city.toLowerCase().includes(location.value.toLowerCase())
    })
})

watch(
    store.hotels,
    async () => {
        await store.getHotels()
    },
    { immediate: true },
)
</script>

<template>
    <main class="min-h-screen bg-slate-100">
        <div class="container mx-auto pt-20">
            <!-- Kontrollera om det finns filtrerade hotell och visa dem -->
            <ul v-if="filteredHotels.length > 0" class="flex flex-col gap-4">
                <HotelCard
                    v-for="hotel in filteredHotels"
                    :key="hotel.name"
                    :hotel="hotel"
                />
            </ul>
            <!-- Om inga hotell matchar, visa ett meddelande -->
            <p v-else>Inga hotell hittades för den valda destinationen.</p>
        </div>
    </main>
</template>
