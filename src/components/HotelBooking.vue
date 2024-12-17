<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { Wifi, EggFried, Brush, CirclePlus, CircleMinus } from 'lucide-vue-next';
import type { SimpleDateRange } from 'v-calendar/dist/types/src/utils/date/range.js';
import { useHotelStore } from '@/stores/hotel';

const route = useRoute();
const store = useHotelStore();
const hotel = ref<Hotel>({} as Hotel)
const loading = ref<boolean>(false)

const { name, from, to, adults, children } = route.params
const adultCount = ref<number>(parseInt(adults.toString()))
const childrenCount = ref<number>(parseInt(children.toString()))

const router = useRouter();
const isGuestModalOpen = ref(false)
const dateRange = ref<SimpleDateRange>({
    start: new Date(from.toString()),
    end: new Date(to.toString())
})

const increaseAdults = () => {
    adultCount.value++
}

const decreaseAdults = () => {
    if (adultCount.value > 0) adultCount.value--
}

const increaseChildren = () => {
    childrenCount.value++
}

const decreaseChildren = () => {
    if (childrenCount.value > 0) childrenCount.value--
}

const offers = ref<OfferType[]>([{
    icon: Wifi,
    name: "wifi",
    checked: false,
    price: 100,
},
{
    icon: EggFried,
    name: "breakfast",
    checked: false,
    price: 100
},
{
    icon: Brush,
    name: "cleaning",
    checked: false,
    price: 500,
}]);

const createParams = computed(() => {
    const searchParams = {
        from: dateRange.value.start.toISOString().split("T")[0],
        to: dateRange.value.end.toISOString().split("T")[0],
        adults: adultCount.value,
        children: childrenCount.value,
    }

    return searchParams;
})

const totalDays = computed(() => {
    return Math.round((dateRange.value.end.getTime() - dateRange.value.start.getTime()) / (1000 * 3600 * 24));
})

const checkedAll = computed(() => {
    return offers.value.every((offer) => offer.checked)
})

const totalOffers = computed(() => {
    return offers.value.filter((offer) => offer.checked).length;
})

const checkall = () => {
    const select = checkedAll.value;
    offers.value.forEach((offer) => {
        offer.checked = !select;
    })
}

const calculatePerNight = computed(() => {
    return (hotel.value.price_per_night.adult * adultCount.value + hotel.value.price_per_night.child * childrenCount.value) * totalDays.value;
})

const checkedOffers = computed(() => {
    type OfferNames = typeof offers.value[number]["name"];
    const offersTotal: Record<OfferNames, number> = offers.value.reduce((acc, offer) => {
        acc[offer.name] = offer.checked ? offer.price : 0;
        return acc;
    }, {} as Record<OfferNames, number>);
    return offersTotal;
})

const calculateOffers = computed(() => {
    return checkedOffers.value.breakfast * (adultCount.value + childrenCount.value) + checkedOffers.value.wifi + checkedOffers.value.cleaning
})

const calculateTotalPrice = computed(() => {
    return calculatePerNight.value + calculateOffers.value;
})

const convertToCheckout = computed<CheckoutType>(() => {
    return {
        hotel: hotel.value,
        offers: checkedOffers.value,
        total_price: calculateTotalPrice.value,
        date_range: {
            start: dateRange.value.start.toISOString().split("T")[0],
            end: dateRange.value.end.toISOString().split("T")[0],
        },
        adults: adultCount.value,
        children: childrenCount.value
    }
})

function handleCheckout() {
    store.addToCheckout(convertToCheckout.value)
    router.push({ name: "checkout" })
}

watchEffect(async () => {
    try {
        loading.value = true;

        const response = await fetch('/hotels.json');
        const data: Hotel[] = await response.json();

        const hotelValue: Hotel = data.find((hotel) => hotel.name.includes(name.toString())) as Hotel

        if (!hotelValue) throw new Error("Hotel not found");

        loading.value = false;
        hotel.value = hotelValue;
    } catch (error) {
        console.error(error)
    }
})

watchEffect(() => {
    router.replace({
        name: "hotel",
        params: createParams.value
    })
})

</script>

<template>
    <div v-if="!loading">
        <div class="container flex mx-auto gap-2 p-4">
            <div>
                <img :src="`/img/${hotel.img}`" :alt="hotel.name" class="object-cover size-96 rounded-md">
                <h2 class="font-bold">{{ hotel.name }}, {{ hotel.city }}</h2>
                <p>{{ hotel.beds }} sängar</p>
            </div>

            <div class="ml-auto space-y-2">
                <p><span class="font-bold">Vuxen 18+ år {{ hotel.price_per_night.adult }}kr SEK</span>/natt</p>
                <p><span class="font-bold">Barn 1-17 år {{ hotel.price_per_night.child }}kr SEK</span>/natt</p>
                <div
                    class="mx-5 flex h-[85px] w-full items-center justify-center divide-x rounded-full border border-gray-200 bg-white shadow-lg">

                    <VDatePicker v-model.range="dateRange" mode="date">
                        <template #default="{ inputValue, inputEvents }">
                            <div
                                class="flex h-full w-64 flex-col items-center justify-center text-start transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none">
                                <p>Incheckning</p>
                                <input class="bg-transparent text-center font-extralight focus:outline-none "
                                    :value="inputValue.start" v-on="inputEvents.start" readonly>
                            </div>
                            <div
                                class="flex h-full w-64 flex-col items-center justify-center text-start transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none">
                                <p>Utcheckning</p>
                                <input class="bg-transparent text-center font-extralight focus:outline-none"
                                    :value="inputValue.end" v-on="inputEvents.end" readonly />
                            </div>
                        </template>
                    </VDatePicker>
                    <button
                        class="relative h-full w-full transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                        @mouseenter="isGuestModalOpen = true" @mouseleave="isGuestModalOpen = false">
                        <div class="flex flex-col items-start">
                            <span class="relative left-9">Vem</span>
                            <span class="relative left-9 font-extralight">Lägg till gäster</span>
                        </div>
                        <Transition enter-active-class="transition duration-200 ease-in-out"
                            enter-from-class="opacity-0 scale-95 -translate-y-4"
                            enter-to-class="opacity-100 scale-100 translate-y-0"
                            leave-active-class="transition duration-200 ease-in-out"
                            leave-from-class="opacity-100 scale-100 translate-y-0"
                            leave-to-class="opacity-0 scale-95 -translate-y-4">
                            <div v-if="isGuestModalOpen" class="absolute -bottom-[11px] right-1 h-3 w-[350px]">
                                <ul
                                    class="absolute right-0 top-[11px] flex w-[350px] flex-col items-center justify-center divide-y rounded-lg border bg-white p-4 shadow-xl">
                                    <li class="flex w-full items-center justify-between p-5">
                                        <p>Vuxna</p>
                                        <div class="flex items-center justify-center gap-2">
                                            <button @click.stop="decreaseAdults">
                                                <CircleMinus :size="30" :color="adultCount <= 0 ? 'lightgray' : ''
                                                    " :stroke-width="1" />
                                            </button>
                                            <span class="w-5">{{ adultCount }}</span>
                                            <button @click.stop="increaseAdults">
                                                <CirclePlus :size="30" :stroke-width="1" />
                                            </button>
                                        </div>
                                    </li>
                                    <li class="flex w-full items-center justify-between p-5">
                                        <p>Barn</p>
                                        <div class="flex items-center justify-center gap-2">
                                            <button @click.stop="decreaseChildren">
                                                <CircleMinus :color="childrenCount <= 0 ? 'lightgray' : ''
                                                    " :size="30" :stroke-width="1" />
                                            </button>
                                            <span class="w-5">{{ childrenCount }}</span>
                                            <button @click.stop="increaseChildren">
                                                <CirclePlus :size="30" :stroke-width="1" />
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Transition>
                    </button>
                </div>

                <div class="flex border-b border-gray-300">
                    <div>
                        <input type="checkbox" @click="checkall" :checked="checkedAll"> Markera alla</input>
                        <div class="flex flex-col space-y-2 pt-2">
                            <div v-for="offer in offers" :key="offer.name"
                                class="flex flex-col items-center bg-blue-300 w-16 rounded-md"
                                :class="offer.checked ? 'opacity-100' : 'opacity-60'">
                                <component :is="offer.icon" class="size-8" />
                                <input type="checkbox" :id="offer.name" :value="offer.name" v-model="offer.checked">
                                <label :for="offer.name" class="capitalize">{{ offer.name }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-col">
                        <div class="flex justify-between max-w-xs">
                            <p>{{ hotel.price_per_night.child * childrenCount + hotel.price_per_night.adult * adultCount
                                }}
                                x {{ totalDays }} nätter</p>
                            <p><span class="font-bold">{{ calculatePerNight }}kr SEK</span></p>
                        </div>
                        <div class="flex justify-between max-w-xs">
                            <p>{{ calculateOffers }}x {{ totalOffers }} tillägg</p>
                            <p><span class="font-bold">{{ calculateOffers }}kr SEK</span></p>
                        </div>
                    </div>

                </div>

                <div class="flex justify-between text-lg">
                    <p>Total summa: {{ calculateTotalPrice }} <span class="font-bold">kr SEK</span></p>
                    <button class="border rounded-md p-2 bg-blue-400 " @click="handleCheckout">Reservera</button>
                </div>
            </div>
        </div>
    </div>
</template>