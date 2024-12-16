<script setup>
import { Plus } from "lucide-vue-next"
import { Minus } from "lucide-vue-next"
import { Search } from "lucide-vue-next"
import { ref, onMounted, computed, reactive } from "vue"
import { useRouter } from "vue-router"
import { useHotelStore } from "@/stores/hotel"

const store = useHotelStore()
const router = useRouter()

const isGuestModalOpen = ref(false)
const isLocationModalOpen = ref(false)
const dates = ref({
    start: new Date(),
    end: new Date(),
})

const location = ref("")
const locationList = ref([])
const disabledDates = ref([{ start: null, end: new Date() }])

const guestCount = reactive({
    adults: 0,
    children: 0,
})
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

const isSearchDisabled = computed(() => {
    return (
        !location.value ||
        !dates.value.start ||
        !dates.value.end ||
        (guestCount.adults === 0 && guestCount.children === 0)
    )
})

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
                            class="absolute right-0 top-[11px] flex max-h-[270px] w-[250px] flex-col items-center justify-start divide-y overflow-y-scroll rounded-lg border bg-white p-4 shadow-xl"
                        >
                            <li
                                v-for="loc in locationList"
                                :key="loc"
                                @click="
                                    ((location = loc),
                                    (isLocationModalOpen = false))
                                "
                                class="flex w-full cursor-pointer items-center justify-between p-5 hover:underline"
                            >
                                <span>{{ loc }}</span>
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
                            class="absolute right-0 top-[11px] flex w-[250px] flex-col items-center justify-center divide-y rounded-lg border bg-white p-4 shadow-xl"
                        >
                            <li
                                class="flex w-full items-center justify-between p-5"
                            >
                                <p>Vuxna</p>
                                <div
                                    class="flex items-center justify-center gap-2"
                                >
                                    <button
                                        @click.stop="
                                            decreaseGuestCount('adults')
                                        "
                                    >
                                        <Minus
                                            :size="25"
                                            :color="
                                                guestCount.adults <= 0
                                                    ? 'lightgray'
                                                    : ''
                                            "
                                            :stroke-width="1"
                                        />
                                    </button>
                                    <span class="w-5">{{
                                        guestCount.adults
                                    }}</span>
                                    <button
                                        @click.stop="
                                            increaseGuestCount('adults')
                                        "
                                    >
                                        <Plus :size="25" :stroke-width="1" />
                                    </button>
                                </div>
                            </li>
                            <li
                                class="flex w-full items-center justify-between p-5"
                            >
                                <p>Barn</p>
                                <div
                                    class="flex items-center justify-center gap-2"
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
                                            :size="25"
                                            :stroke-width="1"
                                        />
                                    </button>
                                    <span class="w-5">{{
                                        guestCount.children
                                    }}</span>
                                    <button
                                        @click.stop="
                                            increaseGuestCount('children')
                                        "
                                    >
                                        <Plus :size="25" :stroke-width="1" />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </div>
        </div>
        <button
            class="absolute right-8 max-h-16 min-h-16 min-w-16 max-w-32 cursor-pointer rounded-full bg-sky-600 text-center transition-transform duration-200 ease-in-out hover:scale-[1.05] hover:rounded-full hover:bg-sky-500 focus:shadow-sm focus:outline-none active:bg-blue-600"
            :disabled="isSearchDisabled"
            @click="search"
        >
            <Search class="mx-auto" :size="23" color="white" />
        </button>
    </div>
</template>
