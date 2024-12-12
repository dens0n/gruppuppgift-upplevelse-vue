<script setup>
import { CirclePlus } from "lucide-vue-next"
import { CircleMinus } from "lucide-vue-next"
import { Search } from "lucide-vue-next"
import { ref } from "vue"
import { useRouter } from "vue-router"

const isGuestModalOpen = ref(false)
const fromDate = ref(new Date())
const toDate = ref(new Date())
const adults = ref(0)
const children = ref(0)

const router = useRouter()

const location = ref("")

const increaseAdults = () => {
    adults.value++
}

const decreaseAdults = () => {
    if (adults.value > 0) adults.value--
}

const increaseChildren = () => {
    children.value++
}

const decreaseChildren = () => {
    if (children.value > 0) children.value--
}

const search = () => {
    const searchParams = {
        from: fromDate.value.toISOString().split("T")[0],
        to: toDate.value.toISOString().split("T")[0],
        adults: adults.value,
        children: children.value,
    }
    router.push({
        name: "hotels",
        params: searchParams,
    })
}
</script>

<template>
    <div class="relative flex items-center justify-center">
        <div
            class="mx-5 flex h-[85px] w-full max-w-4xl items-center justify-center divide-x rounded-full border border-gray-200 bg-white shadow-lg"
        >
            <input
                class="h-full min-w-64 rounded-l-full p-10 text-start transition-transform duration-200 ease-in-out hover:rounded-r-full hover:bg-gray-200 hover:shadow-md focus:rounded-r-full focus:bg-gray-100 focus:shadow-md focus:outline-none"
                type="text"
                placeholder="Var"
                v-model="location"
            />

            <VDatePicker v-model="fromDate">
                <template #default="{ inputValue, inputEvents }">
                    <div
                        class="flex h-full w-64 flex-col items-center justify-center text-start transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                        :value="inputValue"
                        v-on="inputEvents"
                    >
                        <p>Incheckning</p>
                        <input
                            class="bg-inherit text-center font-extralight focus:outline-none"
                            :value="inputValue"
                            readonly
                        />
                    </div>
                </template>
            </VDatePicker>
            <VDatePicker v-model="toDate">
                <template #default="{ inputValue, inputEvents }">
                    <div
                        class="flex h-full w-64 flex-col items-center justify-center text-center transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
                        :value="inputValue"
                        v-on="inputEvents"
                    >
                        <p>Utcheckning</p>
                        <input
                            class="bg-inherit text-center font-extralight focus:outline-none"
                            :value="inputValue"
                            readonly
                        />
                    </div>
                </template>
            </VDatePicker>

            <button
                class="relative h-full w-full transition-transform duration-200 ease-in-out hover:rounded-full hover:bg-gray-200 hover:shadow-md focus:rounded-full focus:bg-gray-200 focus:shadow-sm focus:outline-none"
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
                        class="absolute -bottom-[11px] right-1 h-3 w-[350px]"
                    >
                        <ul
                            class="absolute right-0 top-[11px] flex w-[350px] flex-col items-center justify-center divide-y rounded-lg border bg-white p-4 shadow-xl"
                        >
                            <li
                                class="flex w-full items-center justify-between p-5"
                            >
                                <p>Vuxna</p>
                                <div
                                    class="flex items-center justify-center gap-2"
                                >
                                    <button @click.stop="decreaseAdults">
                                        <CircleMinus
                                            :size="30"
                                            :color="
                                                adults <= 0 ? 'lightgray' : ''
                                            "
                                            :stroke-width="1"
                                        />
                                    </button>
                                    <span class="w-5">{{ adults }}</span>
                                    <button @click.stop="increaseAdults">
                                        <CirclePlus
                                            :size="30"
                                            :stroke-width="1"
                                        />
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
                                    <button @click.stop="decreaseChildren">
                                        <CircleMinus
                                            :color="
                                                children <= 0 ? 'lightgray' : ''
                                            "
                                            :size="30"
                                            :stroke-width="1"
                                        />
                                    </button>
                                    <span class="w-5">{{ children }}</span>
                                    <button @click.stop="increaseChildren">
                                        <CirclePlus
                                            :size="30"
                                            :stroke-width="1"
                                        />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </button>
        </div>
        <button
            class="absolute right-8 max-h-16 min-h-16 min-w-16 max-w-32 rounded-full bg-blue-500 text-center transition-transform duration-200 ease-in-out hover:scale-110 hover:rounded-full hover:bg-blue-400 focus:shadow-sm focus:outline-none active:bg-blue-600"
            @click="search"
        >
            <Search class="mx-auto" :size="23" color="white" />
        </button>
    </div>
</template>
