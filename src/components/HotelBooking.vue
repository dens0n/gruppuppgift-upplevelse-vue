<script setup lang="ts">
import { computed, ref, registerRuntimeCompiler, watch, watchEffect } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { Wifi, EggFried, Brush, CirclePlus, CircleMinus } from 'lucide-vue-next';

const hotel = ref<Hotel>({} as Hotel)
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(false)
const offers = ref<string[]>([]);
const { name, from, to, adults, children } = route.params

const isGuestModalOpen = ref(false)
const fromDate = ref<Date>(new Date(from.toString()))
const toDate = ref<Date>(new Date(to.toString()))
const adultsValue = ref<number>(parseInt(adults.toString()))
const childrenValue = ref<number>(parseInt(children.toString()))
const days = ref<number>(Math.round((toDate.value.getTime() - fromDate.value.getTime()) / (1000 * 3600 * 24)))

const increaseAdults = () => {
    adultsValue.value++
}

const decreaseAdults = () => {
    if (adultsValue.value > 0) adultsValue.value--
}

const increaseChildren = () => {
    childrenValue.value++
}

const decreaseChildren = () => {
    if (childrenValue.value > 0) childrenValue.value--
}

const countDays = computed(() => {
    return Math.round((toDate.value.getTime() - fromDate.value.getTime()) / (1000 * 3600 * 24));
})

const createParams = computed(() => {
    const searchParams = {
        from: fromDate.value.toISOString().split("T")[0],
        to: toDate.value.toISOString().split("T")[0],
        adults: adultsValue.value,
        children: childrenValue.value,
    }

    return searchParams;
})

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
        <div class="container flex flex-col mx-auto gap-2">
            <img :src="`/img/${hotel.img}`" :alt="hotel.name" class="object-cover size-64 rounded-md">
            <h2 class="font-bold">{{ hotel.name }}, {{ hotel.city }}</h2>
            <p>{{ hotel.beds }}</p>
            <p>Antal gäster</p>
            <p>Antal sovrum</p>
            <p>Antal badrum</p>

            <div class="ml-auto">
                <p><span class="font-bold">Vuxen 18+ år {{ hotel.price_per_night.adult }}kr SEK</span>/natt</p>
                <p><span class="font-bold">Barn 1-17 år {{ hotel.price_per_night.child }}kr SEK</span>/natt</p>
                <div
                    class="mx-5 flex h-[85px] w-full max-w-4xl items-center justify-center divide-x rounded-full border border-gray-200 bg-white shadow-lg">

                    <VDatePicker v-model="fromDate" mode="date">
                        <template #default="{ inputValue, inputEvents }">
                            <div class="flex h-full w-64 flex-col items-center justify-center text-start transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                                :value="inputValue" v-on="inputEvents">
                                <p>Incheckning</p>
                                <input class="bg-inherit text-center font-extralight focus:outline-none"
                                    :value="inputValue" readonly />
                            </div>
                        </template>
                    </VDatePicker>
                    <VDatePicker v-model="toDate" mode="date">
                        <template #default="{ inputValue, inputEvents }">
                            <div class="flex h-full w-64 flex-col items-center justify-center text-center transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                                :value="inputValue" v-on="inputEvents">
                                <p>Utcheckning</p>
                                <input class="bg-inherit text-center font-extralight focus:outline-none"
                                    :value="inputValue" readonly />
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
                                                <CircleMinus :size="30" :color="adultsValue <= 0 ? 'lightgray' : ''
                                                    " :stroke-width="1" />
                                            </button>
                                            <span class="w-5">{{ adultsValue }}</span>
                                            <button @click.stop="increaseAdults">
                                                <CirclePlus :size="30" :stroke-width="1" />
                                            </button>
                                        </div>
                                    </li>
                                    <li class="flex w-full items-center justify-between p-5">
                                        <p>Barn</p>
                                        <div class="flex items-center justify-center gap-2">
                                            <button @click.stop="decreaseChildren">
                                                <CircleMinus :color="childrenValue <= 0 ? 'lightgray' : ''
                                                    " :size="30" :stroke-width="1" />
                                            </button>
                                            <span class="w-5">{{ childrenValue }}</span>
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
                <p>Tillägg</p>

                <div class="flex border-b border-gray-300 justify-between pt-2">
                    <div class="flex flex-col items-center bg-blue-300">
                        <Wifi />
                        <input type="checkbox" id="wifi" value="Wifi" v-model="offers">
                        <label for="wifi">Wifi</label>
                    </div>
                    <div class="flex flex-col items-center bg-blue-300">
                        <EggFried />
                        <input type="checkbox" id="frukost" value="Frukost" v-model="offers">
                        <label for="frukost">Frukost</label>
                    </div>
                    <div class="flex flex-col items-center bg-blue-300">
                        <Brush />
                        <input type="checkbox" id="städning" value="Städning" v-model="offers">
                        <label for="städning">Städning</label>
                    </div>
                </div>

                <p>Sammanlagda priset {{ countDays }}</p>
            </div>
        </div>
    </div>
</template>
<!-- 
"name": "Grand Plaza",
"city": "Stockholm",
"price_per_night": {
    "adult": 1200,
    "child": 800
},
"beds": 2,
"img": "GrandPlaza.jpg" 
        "essential_info": [
            "Hel villa",
            "Rymmer 4",
            "1 sovrum",
            "1 badrum",
            "7 sängar"
        ],
-->