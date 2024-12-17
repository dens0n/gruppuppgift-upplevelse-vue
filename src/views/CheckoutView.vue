<script setup>
import { useHotelStore } from "@/stores/hotel"
import { storeToRefs } from "pinia"

const store = useHotelStore()
const { checkout } = storeToRefs(store)

// Funktion för att formatera pris
const formatPrice = (price) => `${price.toLocaleString("sv-SE")} SEK`

const confirmBooking = () => {
    const bookingDetails = `
Hotell: ${checkout.value.hotel.name}
Plats: ${checkout.value.hotel.city}
Datum: ${checkout.value.date_range.start} - ${checkout.value.date_range.end}
Gäster: ${checkout.value.adults} vuxna, ${checkout.value.children} barn
Totalt pris: ${checkout.value.total_price.toLocaleString("sv-SE")} SEK
  `

    alert(`Bekräfta din bokning:\n${bookingDetails}`)
}
</script>

<template>
    <div
        class="mx-auto grid max-w-4xl grid-cols-2 grid-rows-2 gap-3 rounded-lg bg-transparent p-6"
    >
        <!-- Hotellinformation -->
        <div class="row-span-2 overflow-hidden rounded-lg bg-white shadow">
            <img
                :src="`/img/${checkout.hotel.img}`"
                :alt="checkout.hotel.name"
                class="h-60 w-full rounded-t-lg object-cover"
            />
            <div class="space-y-4 p-6">
                <h1 class="text-3xl font-bold text-gray-800">
                    {{ checkout.hotel.name }}
                </h1>
                <p class="text-gray-600">{{ checkout.hotel.description }}</p>
                <p class="text-sm text-gray-500">
                    <strong>Plats:</strong> {{ checkout.hotel.city }}
                </p>
                <!-- <h2 class="text-2xl font-semibold text-gray-800">
                    Prisdetaljer
                </h2>
                <div class="space-y-2">
                    <p>
                        <strong>Pris per natt (vuxen):</strong>
                        {{ formatPrice(checkout.hotel.price_per_night.adult) }}
                    </p>
                    <p>
                        <strong>Pris per natt (barn):</strong>
                        {{ formatPrice(checkout.hotel.price_per_night.child) }}
                    </p>
                </div>
                <div class="border-t pt-10">
                    <p class="text-lg font-bold text-gray-800">
                        <strong>Totalt pris:</strong>
                        {{ formatPrice(checkout.total_price) }}
                    </p>
                </div> -->
            </div>
        </div>

        <!-- Bokningsdetaljer -->
        <div
            class="space-y-4 rounded-lg bg-white p-6 shadow"
            :class="
                checkout.offers.wifi ||
                checkout.offers.breakfast ||
                checkout.offers.cleaning
                    ? ''
                    : 'row-span-2'
            "
        >
            <h2 class="text-2xl font-semibold text-gray-800">
                Bokningsdetaljer
            </h2>
            <p>
                <strong>Datum:</strong> {{ checkout.date_range.start }} -
                {{ checkout.date_range.end }}
            </p>
            <p>
                <strong>Gäster:</strong> {{ checkout.adults }} vuxna,
                {{ checkout.children }} barn
            </p>
            <p><strong>Sängar:</strong> {{ checkout.hotel.beds }}</p>
        </div>
        <!-- Tillval -->
        <div
            v-if="
                checkout.offers.wifi ||
                checkout.offers.breakfast ||
                checkout.offers.cleaning
            "
            class="space-y-4 rounded-lg bg-white p-6 shadow"
        >
            <h2 class="text-2xl font-semibold text-gray-800">Tillval</h2>
            <ul class="flex flex-col gap-1">
                <li v-if="checkout.offers.wifi" class="text-gray-600">Wi-Fi</li>
                <li v-if="checkout.offers.breakfast" class="text-gray-600">
                    Frukost
                </li>
                <li v-if="checkout.offers.cleaning" class="text-gray-600">
                    Städning
                </li>
            </ul>
        </div>

        <!-- Prissammanställning -->
        <div class="col-span-2 space-y-4 rounded-lg bg-white p-6 shadow">
            <h2 class="text-2xl font-semibold text-gray-800">Prisdetaljer</h2>
            <div class="space-y-2">
                <p>
                    <strong>Pris per natt (vuxen):</strong>
                    {{ formatPrice(checkout.hotel.price_per_night.adult) }}
                </p>
                <p>
                    <strong>Pris per natt (barn):</strong>
                    {{ formatPrice(checkout.hotel.price_per_night.child) }}
                </p>
            </div>
            <div class="border-t pt-4">
                <p class="text-lg font-bold text-gray-800">
                    <strong>Totalt pris:</strong>
                    {{ formatPrice(checkout.total_price) }}
                </p>
            </div>
            <div class="text-center">
                <button
                    @click="confirmBooking"
                    class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700"
                >
                    Bekräfta bokning
                </button>
            </div>
        </div>
    </div>
</template>
