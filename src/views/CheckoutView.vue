<script setup lang="ts">
import { useHotelStore } from "@/stores/hotel"
import { storeToRefs } from "pinia"
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useHotelStore()
const { checkout } = storeToRefs(store)
const router = useRouter();

// Funktion för att formatera pris
const formatPrice = (price: number) => `${price.toLocaleString("sv-SE")} SEK`

const cardNumber = ref("");
const cardholderName = ref("");
const expiryDate = ref("");
const cvv = ref("");

const handleSubmit = () => {
    if (cardNumber.value && cardholderName.value && expiryDate.value && cvv.value) {
        alert("Payment successful!");
        // Add payment processing logic here
    } else {
        alert("Please fill out all fields.");
    }
}

const resetCheckout = () => {
    if (store.checkoutAmount > 0) {
        router.push("/");
        store.removeFromCheckout();
    }
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
            <div class="flex justify-between pt-4 border-t">
                <p class="text-lg font-bold text-gray-800">
                    <strong>Totalt pris:</strong>
                    {{ formatPrice(checkout.total_price) }}
                </p>
                <button @click="resetCheckout"
                    class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Återställ kundkorg
                </button>
            </div>
        </div>

        <div class="col-span-2 p-6 space-y-4 bg-white rounded-lg shadow">
            <h2 class="mb-4 text-2xl font-semibold text-gray-800">
                Payment Details
            </h2>
            <form @submit.prevent="handleSubmit">
                <!-- Card Number -->
                <div class="mb-4">
                    <label for="card-number" class="block text-sm font-medium text-gray-600">Card Number</label>
                    <input id="card-number" type="text" v-model="cardNumber" placeholder="1234 5678 9012 3456"
                        maxlength="19"
                        class="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <!-- Cardholder Name -->
                <div class="mb-4">
                    <label for="cardholder-name" class="block text-sm font-medium text-gray-600">Cardholder Name</label>
                    <input id="cardholder-name" type="text" v-model="cardholderName" placeholder="John Doe"
                        class="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <!-- Expiry Date -->
                <div class="mb-4">
                    <label for="expiry-date" class="block text-sm font-medium text-gray-600">Expiry Date</label>
                    <input id="expiry-date" type="text" v-model="expiryDate" placeholder="MM/YY" maxlength="5"
                        class="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <!-- CVV -->
                <div class="mb-4">
                    <label for="cvv" class="block text-sm font-medium text-gray-600">CVV</label>
                    <input id="cvv" type="password" v-model="cvv" placeholder="123" maxlength="4"
                        class="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <!-- Submit Button -->
                <button type="submit"
                    class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Pay Now
                </button>
            </form>
        </div>
    </div>
</template>
