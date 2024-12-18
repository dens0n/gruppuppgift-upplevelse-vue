<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Wifi, EggFried, Brush, Plus, Minus } from 'lucide-vue-next';
import type { SimpleDateRange } from 'v-calendar/dist/types/src/utils/date/range.js';
import { useHotelStore } from '@/stores/hotel';

const route = useRoute();
const store = useHotelStore();
const hotel = ref<Hotel>({} as Hotel)
const loading = ref<boolean>(false)

const { name, from, to, adults, children } = route.params

const router = useRouter();
const isGuestModalOpen = ref(false)
const dateRange = ref<SimpleDateRange>({
    start: new Date(from.toString()),
    end: new Date(to.toString())
})

const guestCount = reactive({
    adults: Math.max(1, parseInt(adults.toString())),
    children: parseInt(children.toString()),
})

const totalGuests = computed(() => {
    return guestCount.adults + guestCount.children;
})

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
        adults: guestCount.adults,
        children: guestCount.children,
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
    return (hotel.value.price_per_night.adult * guestCount.adults + hotel.value.price_per_night.child * guestCount.children) * totalDays.value;
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
    return checkedOffers.value.breakfast * (guestCount.adults + guestCount.children) + checkedOffers.value.wifi + checkedOffers.value.cleaning
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
        adults: guestCount.adults,
        children: guestCount.children
    }
})

const increaseGuestCount = (type: "adults" | "children") => {
    if (guestCount[type] !== undefined && totalGuests.value < hotel.value.max_guests) {
        guestCount[type]++
    }
}
const decreaseGuestCount = (type: "adults" | "children") => {
    if (guestCount[type] !== undefined && guestCount[type] > 0 && totalGuests.value > 1) {
        guestCount[type]--
    }
}

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
        <div class="max-w-fit flex mx-auto gap-4 p-4 ">
            <div class="min-w-[400px] bg-white rounded-md p-4 space-y-2 shadow-lg">
                <img :src="`/img/${hotel.img}`" :alt="hotel.name" class="object-cover size-96 rounded-md">
                <h2 class="font-bold">{{ hotel.name }}, {{ hotel.city }}</h2>
                <p>{{ hotel.beds }} sängar</p>
                <p>{{ hotel.description }}</p>
            </div>

            <div class="ml-auto space-y-4 bg-white rounded-md shadow-lg p-4">
                <div class="text-lg">
                    <p><span class="font-bold">Vuxen 18+ år {{ hotel.price_per_night.adult }}kr SEK</span>/natt</p>
                    <p><span class="font-bold">Barn 1-17 år {{ hotel.price_per_night.child }}kr SEK</span>/natt</p>
                </div>
                <div class="relative flex items-center justify-center">
                    <div
                        class="mx-5 flex h-[85px] w-full max-w-4xl items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg">
                        <VDatePicker v-if="hotel.available_dates" v-model.range="dateRange"
                            :popover="{ placement: 'bottom' }" :min-date="hotel.available_dates.start"
                            :max-date="hotel.available_dates.end">
                            <template #default="{ inputValue, inputEvents }">
                                <div class="flex h-full items-center justify-center gap-8 px-6 text-start transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                                    :value="inputValue" v-on="inputEvents.start">
                                    <div class="w-24">
                                        <p class="text-center">Incheckning</p>
                                        <input
                                            class="w-full bg-transparent text-center font-extralight focus:outline-none"
                                            readonly :value="inputValue.start" v-on="inputEvents.start" />
                                    </div>
                                    <div class="w-24">
                                        <p class="text-center">Utcheckning</p>
                                        <input
                                            class="w-full bg-transparent text-center font-extralight focus:outline-none"
                                            readonly :value="inputValue.end" v-on="inputEvents.end" />
                                    </div>
                                </div>
                            </template>
                        </VDatePicker>
                        <div class="relative flex h-full w-64 flex-col justify-center transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                            @mouseenter="isGuestModalOpen = true" @mouseleave="isGuestModalOpen = false">
                            <div class="flex flex-col items-start">
                                <span class="relative left-9">Vem</span>
                                <span class="relative left-9 font-extralight">{{
                                    guestCount.adults || guestCount.children > 0
                                        ? guestCount.adults +
                                        guestCount.children +
                                        (guestCount.adults + guestCount.children === 1
                                            ? " gäst"
                                            : " gäster")
                                        : "Lägg till gäster"
                                }}</span>
                            </div>
                            <Transition enter-active-class="transition duration-200 ease-in-out"
                                enter-from-class="opacity-0 scale-95 -translate-y-4"
                                enter-to-class="opacity-100 scale-100 translate-y-0"
                                leave-active-class="transition duration-200 ease-in-out"
                                leave-from-class="opacity-100 scale-100 translate-y-0"
                                leave-to-class="opacity-0 scale-95 -translate-y-4">
                                <div v-if="isGuestModalOpen" class="absolute -bottom-[11px] right-1 h-3 w-[250px]">
                                    <ul
                                        class="absolute right-0 top-[11px] flex w-[250px] flex-col items-center justify-center divide-y rounded-lg border bg-white p-2 shadow-xl">
                                        <li class="flex w-full items-center justify-between p-5">
                                            <div>
                                                <p>Vuxna</p>
                                                <p class="text-sm font-extralight">
                                                    13 år och äldre
                                                </p>
                                            </div>
                                            <div class="flex items-center justify-center gap-1">
                                                <button @click.stop="
                                                    decreaseGuestCount('adults')
                                                    ">
                                                    <Minus :size="20" :color="guestCount.adults <= 0 || totalGuests < 0
                                                        ? 'lightgray'
                                                        : ''
                                                        " :stroke-width="1" />
                                                </button>
                                                <span class="w-5 text-center">{{
                                                    guestCount.adults
                                                }}</span>
                                                <button @click.stop="
                                                    increaseGuestCount('adults')
                                                    ">
                                                    <Plus :size="20" :color="totalGuests === hotel.max_guests
                                                        ? 'lightgray'
                                                        : ''
                                                        " :stroke-width="1" />
                                                </button>
                                            </div>
                                        </li>
                                        <li class="flex w-full items-center justify-between p-5">
                                            <div>
                                                <p>Barn</p>
                                                <p class="text-sm font-extralight">
                                                    Upp till 12 år
                                                </p>
                                            </div>
                                            <div class="flex items-center justify-center gap-1">
                                                <button @click.stop="
                                                    decreaseGuestCount('children')
                                                    ">
                                                    <Minus :color="guestCount.children <= 0 || totalGuests < 0
                                                        ? 'lightgray'
                                                        : ''
                                                        " :size="20" :stroke-width="1" />
                                                </button>
                                                <span class="w-5 text-center">{{
                                                    guestCount.children
                                                }}</span>
                                                <button @click.stop="
                                                    increaseGuestCount('children')
                                                    ">
                                                    <Plus :size="20" :color="totalGuests === hotel.max_guests
                                                        ? 'lightgray'
                                                        : ''
                                                        " :stroke-width="1" />
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>

                <div class="flex border-b border-gray-300 gap-4 pb-2">
                    <div>
                        <input type="checkbox" @click="checkall" :checked="checkedAll"> Markera alla</input>
                        <div class="flex pt-2 gap-2">
                            <div v-for="offer in offers" :key="offer.name"
                                class="flex flex-col items-center bg-blue-300 w-16 rounded-md"
                                :class="offer.checked ? 'opacity-100' : 'opacity-40'">
                                <component :is="offer.icon" class="size-8" />
                                <input type="checkbox" :id="offer.name" :value="offer.name" v-model="offer.checked">
                                <label :for="offer.name" class="capitalize">{{ offer.name }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex flex-col text-lg justify-end">
                        <div class="flex justify-between max-w-xs">
                            <p class="underline">
                                {{ hotel.price_per_night.child * guestCount.children +
                                    hotel.price_per_night.adult *
                                    guestCount.adults
                                }} x {{ totalDays }} nätter</p>
                            <p><span class="font-bold">{{ calculatePerNight }}kr SEK</span></p>
                        </div>
                        <div class="flex justify-between max-w-xs underline">
                            <p>{{ calculateOffers }} x {{ totalOffers }} tillval</p>
                            <p><span class="font-bold">{{ calculateOffers }}kr SEK</span></p>
                        </div>
                    </div>

                </div>

                <div class="flex justify-between text-lg">
                    <p>Total summa: {{ calculateTotalPrice }} <span class="font-bold">kr SEK</span></p>
                    <button class="rounded-md p-2 px-8 bg-blue-400 text-xl" @click="handleCheckout">Reservera</button>
                </div>
            </div>
        </div>
    </div>
</template>