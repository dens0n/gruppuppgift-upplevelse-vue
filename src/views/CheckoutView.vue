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
    <div class="grid max-w-4xl grid-cols-2 grid-rows-2 gap-3 p-6 mx-auto bg-transparent rounded-lg"
        v-if="checkout.hotel">
        <!-- Hotellinformation -->
        <div class="row-span-2 overflow-hidden bg-white rounded-lg shadow">
            <img :src="`/img/${checkout.hotel.img}`" :alt="checkout.hotel.name"
                class="object-cover w-full rounded-t-lg h-60" />
            <div class="p-6 space-y-4">
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
                <div class="pt-10 border-t">
                    <p class="text-lg font-bold text-gray-800">
                        <strong>Totalt pris:</strong>
                        {{ formatPrice(checkout.total_price) }}
                    </p>
                </div> -->
            </div>
        </div>

        <!-- Bokningsdetaljer -->
        <div class="p-6 space-y-4 bg-white rounded-lg shadow" :class="checkout.offers.wifi ||
                checkout.offers.breakfast ||
                checkout.offers.cleaning
                ? ''
                : 'row-span-2'
            ">
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
        <div v-if="
            checkout.offers.wifi ||
            checkout.offers.breakfast ||
            checkout.offers.cleaning
        " class="p-6 space-y-4 bg-white rounded-lg shadow">
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
        <div class="col-span-2 p-6 space-y-4 bg-white rounded-lg shadow">
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
            <div class="pt-4 border-t">
                <p class="text-lg font-bold text-gray-800">
                    <strong>Totalt pris:</strong>
                    {{ formatPrice(checkout.total_price) }}
                </p>
            </div>
            <div class="text-center">
                <button @click="confirmBooking"
                    class="px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700">
                    Bekräfta bokning
                </button>
            </div>
        </div>
    </div>
</template>
>>>>>>> main
