<script setup lang="ts">
import { useHotelStore } from "@/stores/hotel";
import { ShoppingCart } from "lucide-vue-next"
import { Bed } from "lucide-vue-next"
import { RouterLink, useRouter } from "vue-router"

const store = useHotelStore();
const router = useRouter();

function resetCheckout() {
    if (store.checkoutAmount > 0) {
        router.push("/");
        store.removeFromCheckout();
    }
}
</script>

<template>
    <nav class="sticky start-0 top-0 z-20 w-full backdrop-blur-[6px]">
        <div class="container flex flex-wrap items-center justify-between p-4 mx-auto">
            <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <Bed :size="30" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap">Star Travel</span>
            </RouterLink>
            <div @click="resetCheckout"
                class="relative flex items-center justify-center p-3 border-2 rounded-full shadow-sm cursor-pointer border-slate-300 hover:bg-sky-400">
                <ShoppingCart />
                <div v-if="store.checkoutAmount === 1"
                    class="absolute flex items-center justify-center w-6 h-6 text-white bg-blue-500 rounded-full -right-2 -top-1 animate-pulse"
                    style="animation-iteration-count: 3; animation-duration: 800ms;">
                    <p class="mb-[2px]">{{ store.checkoutAmount }}</p>
                </div>

            </div>
        </div>
    </nav>
</template>
