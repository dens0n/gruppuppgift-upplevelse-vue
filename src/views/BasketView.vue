<script setup lang="ts">
const bookingData = {
    nights: 3,
    guests: 2,
    dateFrom: "2022-10-01",
    dateTo: "2022-10-04",
    airBnbId: 1
}

const airBnbData = {
    id: 1,
    title: "Cozy apartment in the heart of the city",
    price: 100,
    rating: 4.5,
    reviews: 100,
    location: "New York, USA",
    images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
    ]
}

</script>

<template>
    <main class="flex flex-col items-center mt-10">
        <div class="flex gap-4">
            <!-- your trip -->
            <div class="space-y-4 w-72">
                <h1 class="font-bold">Your trip</h1>
                <div>
                    <p class="font-bold">Dates</p>
                    <p>Feb 3 – 8, 2025</p>
                </div>
                <div>
                    <p class="font-bold">Guests</p>
                    <p>1 guest</p>
                </div>
            </div>
            <!-- Price details -->
            <div class="p-6 border rounded-xl">
                <div class="flex gap-2">
                    <img src="https://via.placeholder.com/100" alt="airbnb image" class="rounded-xl">
                    <p>Premium home with quiet location close to Sälen</p>
                </div>
                <!-- divider -->
                <div class="my-4 border-b"></div>
                <h1 class="font-bold">Price details</h1>
                <div class="flex justify-between">
                    <p>1,950.00 kr SEK x 5 nights</p>
                    <p>9,750.00 kr SEK</p>
                </div>
                <div class="flex justify-between">
                    <p>Airbnb service</p>
                    <p>1,720.60 kr SEK</p>
                </div>
                <!-- divider -->
                <div class="my-4 border-b"></div>
                <div class="flex justify-between">
                    <h1>Total</h1>
                    <h1 class="font-bold">11,470.60 kr SEK</h1>
                </div>
            </div>
        </div>
    </main>
</template>