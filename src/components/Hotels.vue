<script setup lang="ts">
import { watch, computed, reactive } from "vue"
import HotelCard from "./HotelCard.vue"
import { useHotelStore } from "@/stores/hotel"
import { useRoute } from "vue-router"

const store = useHotelStore()
const route = useRoute()


//Hämta ner paramsen
const searchOptions = reactive<SearchOptions>({
    location: route.params.location as string,
    fromDate: new Date(route.params.from as string),
    toDate: new Date(route.params.to as string),
    adults: Number(route.params.adults) || 0,
    children: Number(route.params.children) || 0,
})


// Filtrerar ut hotellen utifrån användarens sökning med params
const filteredHotels = computed(() => {
    return store.hotels.filter((hotel) => {
        const isLocationMatch = hotel.city
            .toLowerCase()
            .includes(searchOptions.location.toLowerCase())

        const isDateMatch =
            new Date(hotel.available_dates.start) <= searchOptions.toDate &&
            new Date(hotel.available_dates.end) >= searchOptions.fromDate

        const isGuestMatch =
            hotel.max_guests >= searchOptions.adults + searchOptions.children

        return isLocationMatch && isDateMatch && isGuestMatch
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
    <main class="min-h-screen bg-gradient-to-b from-slate-100 to-sky-500">
        <div class="container mx-auto pt-20">
            <!-- Kontrollera om det finns filtrerade hotell och visa dem -->
            <ul v-if="filteredHotels.length > 0" class="flex flex-col gap-4">
                <HotelCard
                    v-for="hotel in filteredHotels"
                    :key="hotel.name"
                    :hotel="hotel"
                    :searchOptions="searchOptions"
                />
            </ul>
            <!-- Om inga hotell matchar, visa ett meddelande -->
            <p v-else>Inga hotell hittades för den valda destinationen.</p>
        </div>
    </main>
</template>
