<script setup>
import { Plus } from "lucide-vue-next"
import { Minus } from "lucide-vue-next"
import { Search } from "lucide-vue-next"
import { ref, onMounted, computed, reactive } from "vue"
import { useRouter } from "vue-router"
import { useHotelStore } from "@/stores/hotel"

// Store och Router
const store = useHotelStore()
const router = useRouter()

//States
const isGuestModalOpen = ref(false)
const isLocationModalOpen = ref(false)
const dates = ref({
    start: new Date(),
    end: new Date(),
})
const disabledDates = ref([
    {
        start: null,
        end: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
])
const location = ref("")
const locationList = ref([])
const guestCount = reactive({
    adults: 0,
    children: 0,
})

//Funktioner för antalet gäster
const increaseGuestCount = (type) => {
    if (guestCount[type] !== undefined) {
        guestCount[type]++
    }
}
const decreaseGuestCount = (type) => {
    if (guestCount[type] !== undefined && guestCount[type] > 0) {
        guestCount[type]--
    }
}

//Länkar till nästa sida och skickar med params
const search = () => {
    const searchParams = {
        location: location.value,
        from: dates.value.start.toISOString().split("T")[0],
        to: dates.value.end.toISOString().split("T")[0],
        adults: guestCount.adults,
        children: guestCount.children,
    }
    router.push({
        name: "hotels",
        params: searchParams,
    })
}

//Är inte alla fälten ifyllda så går det inte att söka
const isSearchDisabled = computed(() => {
    return (
        !location.value ||
        !dates.value.start ||
        !dates.value.end ||
        (guestCount.adults === 0 && guestCount.children === 0)
    )
})

// Hämtar alla locations
onMounted(async () => {
    try {
        locationList.value = await store.getHotelLocations()
    } catch (error) {
        console.error("Failed to load locations:", error)
    }
})
</script>

<template>
    <div class="relative flex items-center justify-center">
        <div
            class="mx-5 flex h-[85px] w-full max-w-4xl items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg"
        >
            <div
                class="relative h-full w-48 transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                @mouseenter="isLocationModalOpen = true"
                @mouseleave="isLocationModalOpen = false"
            >
                <div
                    class="flex h-full w-60 flex-col items-start justify-center"
                >
                    <p class="relative left-9">Var</p>
                    <span class="relative left-9 font-extralight">{{
                        location || "Sök destinationer"
                    }}</span>
                </div>
                <Transition
                    enter-active-class="transition duration-200 ease-in-out"
                    enter-from-class="opacity-0 scale-95 -translate-y-4"
                    enter-to-class="opacity-100 scale-100 translate-y-0"
                    leave-active-class="transition duration-200 ease-in-out"
                    leave-from-class="opacity-100 scale-100 translate-y-0"
                    leave-to-class="opacity-0 scale-95 -translate-y-4"
                >
                    <div
                        v-if="isLocationModalOpen"
                        class="absolute -bottom-[11px] left-1 h-3 w-[250px]"
                    >
                        <ul
                            class="absolute right-0 top-[11px] flex max-h-[270px] w-[250px] flex-col items-center justify-start overflow-y-scroll rounded-lg border bg-white p-1 shadow-xl"
                        >
                            <li
                                v-for="loc in locationList"
                                :key="loc"
                                @click="
                                    ((location = loc),
                                    (isLocationModalOpen = false))
                                "
                                class="flex w-full cursor-pointer items-center justify-between"
                            >
                                <button
                                    type="submit"
                                    class="group relative isolation-auto z-10 mx-auto flex h-12 w-full items-center justify-start overflow-hidden rounded-md border-2 border-gray-50 bg-gray-50 px-4 py-2 text-lg shadow-xl backdrop-blur-md before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-sky-300 before:transition-all before:duration-700 before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700"
                                    :class="
                                        location === loc ? 'bg-sky-300' : ''
                                    "
                                >
                                    {{ loc }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </div>

            <VDatePicker
                v-model="dates"
                is-range
                :disabled-dates="disabledDates"
                :popover="{ placement: 'bottom' }"
            >
                <template #default="{ inputValue, inputEvents }">
                    <div
                        class="flex h-full items-center justify-center gap-8 px-6 text-start transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                        :value="inputValue"
                        v-on="inputEvents.start"
                    >
                        <div class="w-24">
                            <p class="text-center">Incheckning</p>
                            <input
                                class="w-full bg-transparent text-center font-extralight focus:outline-none"
                                readonly
                                :value="inputValue.start"
                                v-on="inputEvents.start"
                            />
                        </div>
                        <div class="w-24">
                            <p class="text-center">Utcheckning</p>
                            <input
                                class="w-full bg-transparent text-center font-extralight focus:outline-none"
                                readonly
                                :value="inputValue.end"
                                v-on="inputEvents.end"
                            />
                        </div>
                    </div>
                </template>
            </VDatePicker>

            <div
                class="relative flex h-full w-64 flex-col justify-center transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                @mouseenter="isGuestModalOpen = true"
                @mouseleave="isGuestModalOpen = false"
            >
                <div class="flex flex-col items-start">
                    <span class="relative left-9">Vem</span>
                    <span class="relative left-9 font-extralight"
                        >Lägg till gäster</span
                    >
                </div>
                <Transition
                    enter-active-class="transition duration-200 ease-in-out"
                    enter-from-class="opacity-0 scale-95 -translate-y-4"
                    enter-to-class="opacity-100 scale-100 translate-y-0"
                    leave-active-class="transition duration-200 ease-in-out"
                    leave-from-class="opacity-100 scale-100 translate-y-0"
                    leave-to-class="opacity-0 scale-95 -translate-y-4"
                >
                    <div
                        v-if="isGuestModalOpen"
                        class="absolute -bottom-[11px] right-1 h-3 w-[250px]"
                    >
                        <ul
                            class="absolute right-0 top-[11px] flex w-[250px] flex-col items-center justify-center divide-y rounded-lg border bg-white p-2 shadow-xl"
                        >
                            <li
                                class="flex w-full items-center justify-between p-5"
                            >
                                <div>
                                    <p>Vuxna</p>
                                    <p class="text-sm font-extralight">
                                        13 år och äldre
                                    </p>
                                </div>
                                <div
                                    class="flex items-center justify-center gap-1"
                                >
                                    <button
                                        @click.stop="
                                            decreaseGuestCount('adults')
                                        "
                                    >
                                        <Minus
                                            :size="20"
                                            :color="
                                                guestCount.adults <= 0
                                                    ? 'lightgray'
                                                    : ''
                                            "
                                            :stroke-width="1"
                                        />
                                    </button>
                                    <span class="w-5 text-center">{{
                                        guestCount.adults
                                    }}</span>
                                    <button
                                        @click.stop="
                                            increaseGuestCount('adults')
                                        "
                                    >
                                        <Plus :size="20" :stroke-width="1" />
                                    </button>
                                </div>
                            </li>
                            <li
                                class="flex w-full items-center justify-between p-5"
                            >
                                <div>
                                    <p>Barn</p>
                                    <p class="text-sm font-extralight">
                                        Upp till 12 år
                                    </p>
                                </div>
                                <div
                                    class="flex items-center justify-center gap-1"
                                >
                                    <button
                                        @click.stop="
                                            decreaseGuestCount('children')
                                        "
                                    >
                                        <Minus
                                            :color="
                                                guestCount.children <= 0
                                                    ? 'lightgray'
                                                    : ''
                                            "
                                            :size="20"
                                            :stroke-width="1"
                                        />
                                    </button>
                                    <span class="w-5 text-center">{{
                                        guestCount.children
                                    }}</span>
                                    <button
                                        @click.stop="
                                            increaseGuestCount('children')
                                        "
                                    >
                                        <Plus :size="20" :stroke-width="1" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </div>
        </div>
        <button
            class="absolute right-8 max-h-16 min-h-16 min-w-16 max-w-32 cursor-pointer rounded-full bg-sky-500 text-center transition-transform duration-200 ease-in-out hover:scale-[1.05] hover:rounded-full hover:bg-sky-500 active:bg-sky-400 active:shadow-inner"
            :disabled="isSearchDisabled"
            @click="search"
        >
            <Search class="mx-auto" :size="23" color="white" />
        </button>
    </div>
</template>
